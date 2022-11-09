import type { ActionFunction } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import { json, redirect } from "@remix-run/server-runtime"
import invariant from "tiny-invariant"

import { FormError } from "~/components"
import { createPost } from "~/models/post.server"

type ActionData =
  | {
      markdown: string | null
      slug: string | null
      title: string | null
    }
  | undefined

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`

export const action: ActionFunction = async ({ request }) => {
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

  await createPost({ title, slug, markdown })

  return redirect("/posts/admin")
}

export default function NewPostRoute() {
  const errors = useActionData<ActionData>()

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title ? <FormError>{errors.title}</FormError> : null}
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug ? <FormError>{errors.slug}</FormError> : null}
          <input type="text" name="slug" className={inputClassName} />
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
          className={`${inputClassName} font-mono`}
        />
      </p>
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          name="intent"
          value={"create"}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </div>
    </Form>
  )
}
