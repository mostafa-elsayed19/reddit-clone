"use client";

import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useSession } from "next-auth/react";
import { addComment } from "@/_services/comments";
import { useRouter } from "next/navigation";

function CommentForm({ postId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [formData, setFormData] = useState({
    content: "",
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

    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
    if (!formData.content) {
      console.error("Comment content is required.");
      return;
    }

    const newComment = {
      content: formData.content,
      user_id: userId,
      post_id: postId,
    };

    await addComment(newComment);

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
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default CommentForm;
