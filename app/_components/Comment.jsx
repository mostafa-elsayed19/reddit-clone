"use client";
import { useSession } from "next-auth/react";
import { deleteComment } from "@/_services/comments";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/_services/helpers";

import Button from "./Button";
import CommentForm from "./CommentForm";
import VoteSection from "./VoteSection";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import CommentReply from "./CommentReply";

function Comment({ comment }) {
  console.log(comment);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    id: commentId,
    user_id,
    post_id,
    content,
    users: { username, avatar },
    upvotes,
    downvotes,
    created_at,
    updated_at,
    edited,
    replies,
  } = comment;

  const userId = session?.user?.id;
  const isAuthor = userId === user_id;
  const votes = upvotes - downvotes;

  async function handleDelete(id) {
    // Logic to delete the comment
    if (!isAuthor) {
      console.error("You are not authorized to delete this comment.");
      return;
    }

    // Call the deleteComment function from your service
    await deleteComment(id);
    router.refresh(); // Refresh the page to reflect the changes
  }
  return (
    <li className="relative my-4 flex flex-col justify-between gap-2 rounded-lg border border-t-0 border-l-0 border-gray-100 px-4 py-2">
      <section className="flex justify-between">
        <div className="absolute -top-2 -left-2 flex flex-1 items-center gap-2">
          <img
            src={avatar}
            alt="user profile"
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="text-sm text-gray-600">
            {username}{" "}
            <span className="text-xs text-gray-400">
              • {formatDate(created_at)}{" "}
              {edited && `• Edited ${formatDate(updated_at)}`}
            </span>
          </p>
        </div>
        <div className="flex-1 space-y-2 pt-6 pl-4">
          {isEdit ? (
            <CommentForm
              edit={true}
              content={content}
              commentId={commentId}
              postId={post_id}
              editUserId={user_id}
              setStatus={() => setIsEdit(false)}
            />
          ) : (
            <p>{content}</p>
          )}

          <div className="mb-8 flex items-center gap-2">
            <VoteSection
              flex_direction="flex-col"
              votes={votes}
              votableType={"comment"}
              votableId={commentId}
            />
            <CommentButton reply={true} onClick={() => setIsReply(true)} />
            <ShareButton />
          </div>

          {isReply && (
            <CommentForm
              edit={false}
              reply={true}
              postId={post_id}
              parentId={commentId}
              setStatus={() => setIsReply(!isReply)}
            />
          )}

          {/* Replies */}
          {replies && replies.length > 0 && (
            <>
              {replies.map((reply) => (
                <CommentReply
                  key={reply.id}
                  reply={reply}
                  handleDelete={handleDelete}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                />
              ))}
            </>
          )}
        </div>

        {isAuthor && (
          <section className="space-x-2">
            <Button buttonType="edit" onClick={() => setIsEdit(!isEdit)}>
              <SquarePen size={18} />
            </Button>
            <Button buttonType="delete" onClick={() => handleDelete(commentId)}>
              <Trash2 size={18} />
            </Button>
          </section>
        )}
      </section>
    </li>
  );
}

export default Comment;
