"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { deletePost } from "@/_services/posts";
import { useRouter } from "next/navigation";

import OptionsMenu from "./OptionsMenu";
import PostForm from "./PostForm";

function PostContent({ postId, title, content, user_id, username, image }) {
  const { data: session } = useSession();
  const isUser = session?.user.id === user_id;

  const router = useRouter();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function handleDelete() {
    // Handle delete logic here
    if (isUser) {
      alert("You are not authorized to delete this post.");
      return;
    }
    await deletePost(postId);

    router.push("/");
  }
  return (
    <div className="relative flex flex-col justify-center space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">
        Posted by {username} • 2 hours ago
      </p>
      <p className="mb-6 text-gray-800">{content}</p>
      <img src={image} className="rounded-2xl" />

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

      {/* Modal for editing the post content */}
      {isOpenModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 -z-50 flex items-center justify-center bg-black opacity-50"></div>

          <div className="w-1/3">
            <PostForm
              edit={true}
              postId={postId}
              title={title}
              content={content}
              image={image}
              closeModal={() => setIsOpenModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostContent;
