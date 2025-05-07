"use client";

import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { useSession } from "next-auth/react";

import { createPost, updatePost } from "@/_services/posts";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadImageToCloudinary } from "@/_services/helpers";
import useAuthCheck from "@/Hooks/useAuthCheck";

function PostForm({ edit, postId, title, content, closeModal, image }) {
  const { checkAuth } = useAuthCheck();
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: title || "",
    content: content || "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(image || null);

  function handleAddImage(e) {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  }

  function handleRemoveImage() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkAuth()) return;

    // Handle form submission logic here

    let imageUrl = null;
    if (formData.image) {
      imageUrl = await uploadImageToCloudinary(formData.image);
      if (!imageUrl) {
        console.error("Failed to upload image");
        return;
      }
    }

    const newPost = {
      user_id: session?.user.id,
      title: formData.title,
      content: formData.content,
      image: imageUrl,
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
    setImagePreview(null);
    router.push("/");
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
        <InputField
          type="file"
          name="image"
          onChange={handleAddImage}
          accept="image/*"
          className="hidden"
          imagePreview={imagePreview}
          removeImage={handleRemoveImage}
        />

        <Button type="submit">{edit ? "Edit" : "Post"}</Button>
      </form>
    </section>
  );
}

export default PostForm;
