import Link from "next/link";

function PostCard({ post }) {
  return (
    <article
      key={post.id}
      className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow"
    >
      <div className="flex flex-col items-center text-gray-500">
        <button>🔼</button>
        <span>12</span>
        <button>🔽</button>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="mb-1 text-sm text-gray-500">
          Posted by {post.users.username} • 2 hours ago
        </p>
        <p className="text-sm text-gray-700">
          {post.content.length > 100
            ? `${post.content.slice(0, 100)}...`
            : post.content}
        </p>
        <Link
          href={`/post/${post.id}`}
          className="mt-2 inline-block text-sm text-blue-600 hover:underline"
        >
          View Comments (3)
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
