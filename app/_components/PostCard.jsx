"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";
import VoteSection from "./VoteSection";
import { MessageCircle } from "lucide-react";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";

function PostCard({ post }) {
  const votes = post.upvotes - post.downvotes;
  const router = useRouter();

  return (
    <article
      key={post.id}
      className="cursor-pointer items-start rounded-2xl bg-white p-4 shadow transition-shadow duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg"
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
      <div className="flex flex-col gap-4">
        <section className="flex justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="mb-1 text-sm text-gray-500">
              Posted by {post.users.username} • 2 hours ago
            </p>
            <p className="text-sm text-gray-700">
              {post.content.length > 100
                ? `${post.content.slice(0, 100)}...`
                : post.content}
            </p>
          </div>
          {post.image && (
            <img
              src={post.image}
              className="h-24 w-24 rounded-2xl object-cover"
            />
          )}
        </section>

        <div className="items-centerg flex gap-2">
          <VoteSection
            flex_direction="flex-col"
            votes={votes}
            votableId={post.id}
            votableType="post"
          />

          <Link href={`/post/${post.id}`} onClick={(e) => e.stopPropagation()}>
            <CommentButton commentsCount={post.comments.length} />
          </Link>

          <ShareButton />
        </div>
      </div>
    </article>
  );
}

export default PostCard;
