"use client";

import { useState } from "react";
import OptionsMenu from "./OptionsMenu";
import PostForm from "./PostForm";
import { useSession } from "next-auth/react";
import { deletePost } from "@/_services/posts";
import { useRouter } from "next/navigation";

function PostContent({ postId, title, content, user_id, username }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function handleDelete() {
    // Handle delete logic here
    if (session?.user.id !== user_id) {
      alert("You are not authorized to delete this post.");
      return;
    }
    await deletePost(postId);

    router.push("/");
  }
  return (
    <div className="relative flex flex-col justify-center gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">
        Posted by {username} • 2 hours ago
      </p>
      <p className="mb-6 text-gray-800">{content}</p>

      <OptionsMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
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
      </OptionsMenu>

      {/* Modal for editing the post content can be implemented here */}
      {isOpenModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 -z-50 flex items-center justify-center bg-black opacity-50"></div>

          <div className="w-1/3">
            <PostForm
              edit={true}
              postId={postId}
              title={title}
              content={content}
              closeModal={() => setIsOpenModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostContent;
