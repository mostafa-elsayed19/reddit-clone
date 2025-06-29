"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { createSubreddit, updateSubreddit } from "@/_services/subreddits";
import useAuthCheck from "@/Hooks/useAuthCheck";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SubredditForm({
  editMode = false,
  name,
  description,
  subredditSlug,
  setIsOpenModal,
  setShowForm,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { checkAuth } = useAuthCheck();
  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { state, message } = checkAuth();

    // Check if user is authenticated
    if (!state) {
      toast.error(message);
      return;
    }

    // Handle form submission logic here
    if (!formData.name || !formData.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newSubreddit = {
      name: formData.name,
      description: formData.description,
      admin_id: session.user.id,
      slug: formData.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/\s+/g, "-"),
    };

    // If editMode is true, update the existing subreddit
    if (editMode) {
      // Call the update function here
      const data = await updateSubreddit(subredditSlug, newSubreddit);
      if (!data.state) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setIsOpenModal(false);
      router.push(`/subreddit/${newSubreddit.slug}`);
      return;
    } else {
      // If not in edit mode, create a new subreddit }
      const data = await createSubreddit(newSubreddit);
      if (!data.state) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setFormData({
        name: "",
        description: "",
      });
      setShowForm(false);
      router.refresh();
      return;
    }
  }

  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <h2 className="mb-4 text-2xl font-bold">Create a new subreddit</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Enter subreddit name"
          onChange={handleChange}
          value={formData.name}
        />
        <InputField
          type="textarea"
          name="description"
          placeholder="Enter subreddit description"
          rows={3}
          onChange={handleChange}
          value={formData.description}
        />
        <div>
          <Button type="submit" buttonType="submit">
            {!editMode ? "Submit" : "Update"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default SubredditForm;
