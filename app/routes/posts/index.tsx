import { Link } from "@remix-run/react";

export default function PostsRoute() {
  const posts = [
    {
      slug: "my-first-post",
      title: "My first post!",
    },
    {
      slug: "my-first-post",
      title: "My first post!",
    },
  ];

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
