"use client";

import { forwardRef, useState } from "react";
import { useSession } from "next-auth/react";
import { addComment, editComment } from "@/_services/comments";
import { useRouter } from "next/navigation";

import Button from "./Button";
import InputField from "./InputField";
import useAuthCheck from "@/Hooks/useAuthCheck";

const CommentForm = forwardRef(function CommentForm(
  {
    postId,
    edit = false,
    reply = false,
    content,
    commentId,
    parentId,
    editUserId,
    setStatus,
  },
  ref,
) {
  const { checkAuth } = useAuthCheck();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [formData, setFormData] = useState({
    content: content || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkAuth()) return;

    if (!formData.content) {
      console.error("Comment content is required.");
      return;
    }

    const newComment = {
      content: formData.content,
      user_id: userId,
      post_id: postId,
    };

    if (!edit && !reply) {
      await addComment(newComment);
    } else if (edit) {
      if (userId !== editUserId) {
        console.error("You are not authorized to edit this comment.");
        return;
      }

      await editComment(commentId, newComment);
      setStatus();
    } else if (reply) {
      await addComment({
        ...newComment,
        parent_id: parentId,
      });
      setStatus();
    }

    setFormData({ content: "" }); // Reset the form after submission
    router.refresh();
  }
  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <InputField
        type="textarea"
        name="content"
        rows={2}
        placeholder="Add your comment..."
        onChange={handleChange}
        value={formData.content}
        ref={ref}
      />

      <div className="space-x-2">
        <Button type="submit" buttonType="submit">
          {!edit || reply ? "Submit" : "Save"}
        </Button>
        {(edit || reply) && <Button onClick={setStatus}>Cancel</Button>}
      </div>
    </form>
  );
});

export default CommentForm;
