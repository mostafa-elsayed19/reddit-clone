"use client";

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { supabase } from "@/_lib/supabase";
import { createPost } from "@/_services/posts";

function AddPost() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);

    const newPost = {
      user_id: session?.user.id,
      title: formData.title,
      content: formData.content,
    };

    createPost(newPost);

    setFormData({ title: "", content: "" });
  }
  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">Create a Post</h2>
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
        <Button type="submit">Post</Button>
      </form>
    </section>
  );
}

export default AddPost;
