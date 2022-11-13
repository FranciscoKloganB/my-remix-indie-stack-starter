import type { ActionFunction } from "@remix-run/node"
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
  useTransition
} from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import { FormError } from "~/components"
import { FormInput } from "~/components/FormInput"
import { createPost, deletePost, getPost, updatePost } from "~/models/post.server"
import { requireAdminUser } from "~/session.server"

type ActionData =
  | {
      markdown: string | null
      slug: string | null
      title: string | null
    }
  | undefined

type LoaderData = {
  post: Awaited<ReturnType<typeof getPost>>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireAdminUser(request)

  const { slug } = params

  invariant(slug, "post slug is required; to make a new post set slug to `create`")

  if (slug.toLowerCase() === "create") {
    return json({})
  }

  const post = await getPost(slug)

  if (!post) {
    throw new Response("Post not found", { status: 404 })
  }

  return json<LoaderData>({ post })
}

export const action: ActionFunction = async ({ request, params }) => {
  await requireAdminUser(request)

  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "delete") {
    invariant(params.slug, "slug param is required when action is `delete`")

    await deletePost(params.slug)

    return redirect("/posts/admin")
  }

  const title = formData.get("title")
  const slug = formData.get("slug")
  const markdown = formData.get("markdown")

  const errors: ActionData = {
    title: title ? null : "title is required",
    slug: slug ? null : "slug is required",
    markdown: markdown ? null : "markdown is required"
  }

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage !== null)

  if (hasErrors) {
    return json<ActionData>(errors)
  }

  invariant(typeof title === "string", "title must be a string")
  invariant(typeof slug === "string", "slug must be a string")
  invariant(typeof markdown === "string", "markdown must be a string")

  if (params.slug?.toLowerCase() === "create") {
    await createPost({ title, slug, markdown })
  } else {
    await updatePost(slug, { title, slug, markdown })
  }

  return redirect("/posts/admin")
}

export default function CreatePostRoute() {
  const transition = useTransition()

  const errors = useActionData<ActionData>()

  const { post: existingPost } = useLoaderData<LoaderData>()
  const isNewPost = !existingPost

  const isCreating = transition.submission?.formData.get("intent") === "create"
  const isUpdating = transition.submission?.formData.get("intent") === "update"
  const isDeleting = transition.submission?.formData.get("intent") === "delete"

  return (
    <Form method="post" key={existingPost?.slug ?? "create"}>
      <p>
        <label>
          Post Title: {errors?.title ? <FormError>{errors.title}</FormError> : null}
          <FormInput
            hasError={!!errors?.title}
            type="text"
            name="title"
            defaultValue={existingPost?.title}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <FormError>{errors.slug}</FormError> : null}
          <FormInput
            hasError={!!errors?.slug}
            type="text"
            name="slug"
            defaultValue={existingPost?.slug}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown: {errors?.markdown ? <FormError>{errors.markdown}</FormError> : null}
        </label>
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg font-mono"
          defaultValue={existingPost?.markdown}
        />
      </p>
      <div className="flex justify-end gap-4">
        {isNewPost ? null : (
          <button
            type="submit"
            name="intent"
            value="delete"
            className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreating || isUpdating}
          name="intent"
          type="submit"
          value={isNewPost ? "create" : "update"}
        >
          {isNewPost ? (isCreating ? "Creating..." : "Create Post") : null}
          {isNewPost ? null : isUpdating ? "Updating..." : "Edit Post"}
        </button>
      </div>
    </Form>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()

  if (caught.status === 404) {
    return (
      <div>
        <p>{`It appears the post '${params.slug}', which you are trying to edit does not exist.`}</p>
      </div>
    )
  }

  throw new Error(`Unsupported thrown response status code: ${caught.status}`)
}

export function ErrorBoundary({ error }: { error: unknown }) {
  console.error(
    "Post management route (create/edit) or one of its children faced unexpected error",
    error
  )

  return (
    <div>
      <p>{`Something went wrong. Please come back later.`}</p>
      {error instanceof Error ? <pre>{error.message}</pre> : null}
    </div>
  )
}
