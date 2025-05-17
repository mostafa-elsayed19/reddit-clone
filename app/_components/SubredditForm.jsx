"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { createSubreddit } from "@/_services/subreddits";
import useAuthCheck from "@/Hooks/useAuthCheck";
import { useSession } from "next-auth/react";

function SubredditForm() {
  const { data: session } = useSession();
  const { checkAuth } = useAuthCheck();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if user is authenticated
    if (!checkAuth()) {
      return;
    }

    // Handle form submission logic here
    if (!formData.name || !formData.description) {
      alert("Please fill in all fields");
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

    await createSubreddit(newSubreddit);
    setFormData({
      name: "",
      description: "",
    });
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
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}

export default SubredditForm;
