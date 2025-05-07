"use client";
import { useSession } from "next-auth/react";
import Button from "./Button";
import { deleteComment } from "@/_services/comments";
import { useRouter } from "next/navigation";

function Comment({ comment }) {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    id: commentId,
    user_id,
    content,
    users: { username },
  } = comment;
  const userId = session?.user?.id;
  const isAuthor = userId === user_id;

  async function handleDelete() {
    // Logic to delete the comment
    if (!isAuthor) {
      console.error("You are not authorized to delete this comment.");
      return;
    }

    // Call the deleteComment function from your service
    await deleteComment(commentId);
    router.refresh(); // Refresh the page to reflect the changes
  }
  return (
    <li className="rounded border bg-gray-50 p-3">
      <p className="text-sm text-gray-600">By {username}</p>
      <p>{content}</p>
      {isAuthor && (
        <Button buttonType="delete" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </li>
  );
}

export default Comment;
