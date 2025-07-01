"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { deletePost } from "@/_services/posts";
import { useRouter } from "next/navigation";

import OptionsMenu from "./OptionsMenu";
import PostForm from "./PostForm";
import { formatDate } from "@/_services/helpers";
import Link from "next/link";
import { X } from "lucide-react";

function PostContent({ post }) {
  const {
    id: postId,
    user_id,
    title,
    content,
    users: { username },
    created_at,
    updated_at,
    image,
    edited,
    subreddits: { name: subredditName, slug },
  } = post;
  const { data: session } = useSession();
  const isUser = session?.user.id === user_id;

  const router = useRouter();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function handleDelete() {
    // Handle delete logic here
    if (!isUser) {
      alert("You are not authorized to delete this post.");
      return;
    }
    await deletePost(postId);

    router.push("/");
  }
  return (
    <div className="relative flex flex-col justify-center space-y-3">
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`https://placehold.co/600x400`}
            // src={`https://avatar.iran.liara.run/username?username=${subredditName.replace(" ", "+")}`}
            alt={subredditName}
            className="h-8 w-8 self-start rounded-full object-cover"
          />
          <div>
            <Link href={`/subreddit/${slug}`} className="text-sm text-gray-800">
              {`r/${subredditName}`}{" "}
              <span className="text-xs text-gray-500">
                • {formatDate(created_at)}{" "}
                {edited && `• Edited ${formatDate(updated_at)}`}
              </span>
            </Link>
            <p className="text-sm text-gray-700">{username}</p>
          </div>
        </div>

        {/* Options Menu */}
        <OptionsMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
          {isUser ? (
            <>
              <li
                onClick={() => {
                  setIsOpenMenu(false);
                  setIsOpenModal(true);
                }}
              >
                Edit
              </li>
              <li
                onClick={() => {
                  setIsOpenMenu(false);
                  handleDelete();
                }}
              >
                Delete
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  setIsOpenMenu(false);
                  setIsOpenModal(true);
                }}
              >
                Bookmark
              </li>
              <li
                onClick={() => {
                  setIsOpenMenu(false);
                  handleDelete();
                }}
              >
                Not interested
              </li>
            </>
          )}
        </OptionsMenu>
      </section>

      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mb-6 text-gray-800">{content}</p>
      <img src={image} className="rounded-2xl" />

      {/* Modal for editing the post content */}
      {isOpenModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 -z-50 flex items-center justify-center bg-black opacity-50"></div>

          <div className="relative w-2/3 rounded-lg bg-white p-6 shadow-lg lg:w-1/3">
            <PostForm
              edit={true}
              postId={postId}
              title={title}
              content={content}
              image={image}
              closeModal={() => setIsOpenModal(false)}
            />

            <span
              className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
              onClick={() => setIsOpenModal(false)}
            >
              <X />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostContent;
