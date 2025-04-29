"use client";
import Link from "next/link";
import VoteSection from "./VoteSection";
import { useRouter } from "next/navigation";

function PostCard({ post }) {
  const votes = post.upvotes - post.downvotes;
  const router = useRouter();
  return (
    <article
      key={post.id}
      className="flex cursor-pointer items-start gap-4 rounded-2xl bg-white p-4 shadow transition-shadow duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg"
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
      <VoteSection flex_direction="flex-col" votes={votes} postId={post.id} />

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
          View Comments ({post.comments_count})
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
