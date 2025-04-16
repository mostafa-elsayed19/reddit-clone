"use client";

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useSession } from "next-auth/react";

import { createPost, updatePost } from "@/_services/posts";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

function PostForm({ edit, postId, title, content, closeModal }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: title || "",
    content: content || "",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here

    const newPost = {
      user_id: session?.user.id,
      title: formData.title,
      content: formData.content,
    };

    if (edit) {
      await updatePost(postId, newPost);
      closeModal();
      router.refresh();
      return;
    } else {
      await createPost(newPost);
    }
    setFormData({ title: "", content: "" });
  }
  return (
    <section className={`relative rounded-2xl bg-white p-4 shadow`}>
      {edit && (
        <X
          className="absolute top-4 right-4 cursor-pointer"
          onClick={closeModal}
        />
      )}
      <h2 className="mb-2 text-xl font-semibold">
        {!edit ? "Create a Post" : "Edit Post"}
      </h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          required={true}
        />
        <InputField
          type="textarea"
          placeholder="Say something..."
          onChange={handleChange}
          name="content"
          value={formData.content}
          rows={3}
          required={true}
        />
        <Button type="submit">{edit ? "Edit" : "Post"}</Button>
      </form>
    </section>
  );
}

export default PostForm;
