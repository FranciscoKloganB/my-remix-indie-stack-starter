#!/bin/sh

. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

npm run test
