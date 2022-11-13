import type { ActionFunction } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react"
import type { LoaderFunction } from "@remix-run/server-runtime"
import { json, redirect } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import { FormError } from "~/components"
import { FormInput } from "~/components/FormInput"
import { createPost, getPost } from "~/models/post.server"
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

  return json<LoaderData>({ post })
}

export const action: ActionFunction = async ({ request, params }) => {
  await requireAdminUser(request)

  const formData = await request.formData()

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
    // await updatePost({ title, slug, markdown })
  }

  return redirect("/posts/admin")
}

export default function CreatePostRoute() {
  const data = useLoaderData<LoaderData>()
  const errors = useActionData<ActionData>()

  const transition = useTransition()
  const isCreatingPost = !!transition.submission

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title ? <FormError>{errors.title}</FormError> : null}
          <FormInput hasError={!!errors?.title} type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <FormError>{errors.slug}</FormError> : null}
          <FormInput hasError={!!errors?.slug} type="text" name="slug" />
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
        />
      </p>
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          name="intent"
          value={"create"}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreatingPost}
        >
          {isCreatingPost ? "Creating..." : "Create Post"}
        </button>
      </div>
    </Form>
  )
}
