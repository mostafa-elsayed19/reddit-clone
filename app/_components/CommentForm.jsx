"use client";

import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useSession } from "next-auth/react";
import { addComment, editComment } from "@/_services/comments";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/Hooks/useAuthCheck";

function CommentForm({
  postId,
  edit = false,
  content,
  commentId,
  editUserId,
  setIsEdit,
}) {
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

    if (!edit) {
      await addComment(newComment);
    } else {
      if (userId !== editUserId) {
        console.error("You are not authorized to edit this comment.");
        return;
      }

      await editComment(commentId, newComment);
      setIsEdit();
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
      />
      {!edit && <Button type="submit">Submit</Button>}
      {edit && (
        <div className="space-x-2">
          <Button type="submit" buttonType="submit">
            Save
          </Button>
          <Button onClick={setIsEdit}>Cancel</Button>
        </div>
      )}
    </form>
  );
}

export default CommentForm;
