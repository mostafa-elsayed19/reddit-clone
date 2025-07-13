"use client";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/_services/helpers";

import Link from "next/link";
import VoteSection from "./VoteSection";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";

function PostCard({ post }) {
  const votes = (post.upvotes || 0) - (post.downvotes || 0);
  const router = useRouter();
  const pathname = usePathname();

  const isSubredditPage = pathname.includes("subreddit");

  return (
    <article
      key={post?.id}
      className="cursor-pointer rounded-2xl bg-white p-4 shadow transition-shadow duration-200 ease-in-out hover:bg-gray-50 hover:shadow-lg"
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
    >
      <div className="flex flex-col gap-4">
        <section className="flex justify-between gap-4">
          <div>
            <Link
              href={"/subreddit"}
              className="mb-1 flex items-center gap-2 text-xs text-gray-500"
            >
              <img
                src={
                  isSubredditPage
                    ? post.users?.avatar
                    : // : `https://avatar.iran.liara.run/username?username=${post?.subreddits?.name.replace(" ", "+")}`
                      `https://placehold.co/600x400`
                }
                className="h-6 w-6 rounded-full object-cover"
              />
              {isSubredditPage
                ? `u/${post.users?.username}`
                : `r/${post.subreddits?.name}`}{" "}
              • {formatDate(post?.created_at)}
            </Link>
            <h3 className="text-lg font-semibold">{post?.title}</h3>
          </div>
          {post?.image && (
            <img
              src={post?.image}
              className="max-h-24 max-w-24 rounded-2xl object-contain"
            />
          )}
        </section>

        <div className="items-centerg flex gap-2">
          <VoteSection
            flex_direction="flex-col"
            votes={votes}
            votableId={post?.id}
            votableType="post"
          />

          <CommentButton
            commentsCount={post?.comments?.length}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/post/${post.id}#comment`);
            }}
          />

          <ShareButton postId={post?.id} />
        </div>
      </div>
    </article>
  );
}

export default PostCard;
