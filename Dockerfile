# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl sqlite3

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /greencouch

# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy
ADD package.json package-lock.json .npmrc ./
RUN npm install -g npm@8.19.3
RUN npm install --production=false --ignore-scripts

# Setup production node_modules
FROM base as production-deps

WORKDIR /greencouch

COPY --from=deps /greencouch/node_modules /greencouch/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /greencouch

COPY --from=deps /greencouch/node_modules /greencouch/node_modules

ADD prisma styles ./
RUN npx prisma generate

COPY . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV DATABASE_URL=file:/data/sqlite.db
ENV PORT="8080"
ENV NODE_ENV="production"

# add shortcut for connecting to database CLI
RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli

WORKDIR /greencouch

COPY --from=production-deps /greencouch/node_modules /greencouch/node_modules
COPY --from=build /greencouch/node_modules/.prisma /greencouch/node_modules/.prisma

COPY --from=build /greencouch/build /greencouch/build
COPY --from=build /greencouch/public /greencouch/public
COPY --from=build /greencouch/package.json /greencouch/package.json
COPY --from=build /greencouch/start.sh /greencouch/start.sh
COPY --from=build /greencouch/prisma /greencouch/prisma

ENTRYPOINT [ "./start.sh" ]
