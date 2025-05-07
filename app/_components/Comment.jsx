"use client";
import { useSession } from "next-auth/react";
import Button from "./Button";
import { deleteComment } from "@/_services/comments";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import CommentForm from "./CommentForm";

function Comment({ comment }) {
  const [isEdit, setIsEdit] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    id: commentId,
    user_id,
    post_id,
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
    <li className="flex justify-between gap-4 rounded border bg-gray-50 p-3">
      <section className="flex-1">
        <p className="text-sm text-gray-600">By {username}</p>
        {isEdit ? (
          <CommentForm
            edit={true}
            content={content}
            commentId={commentId}
            postId={post_id}
            editUserId={user_id}
            setIsEdit={() => setIsEdit(false)}
          />
        ) : (
          <p>{content}</p>
        )}
      </section>
      {isAuthor && (
        <section className="space-x-2">
          <Button buttonType="edit" onClick={() => setIsEdit(!isEdit)}>
            <SquarePen size={18} />
          </Button>
          <Button buttonType="delete" onClick={handleDelete}>
            <Trash2 size={18} />
          </Button>
        </section>
      )}
    </li>
  );
}

export default Comment;
