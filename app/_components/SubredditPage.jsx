"use client";

import { useSession } from "next-auth/react";
import Button from "@/_components/Button";
import PostForm from "@/_components/PostForm";
import PostsList from "@/_components/PostsList";
import Sidebar from "@/_components/Sidebar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteSubredditBySlug } from "@/_services/subreddits";

function SubredditPage({ subreddit, posts, slug }) {
  const { data: session } = useSession();
  const { description, admin_id } = subreddit;
  const [showForm, setShowForm] = useState(false);
  const [shouldRenderForm, setShouldRenderForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      setShouldRenderForm(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRenderForm(false);
      }, 300); // Match the duration of the fade-out animation

      return () => clearTimeout(timeout);
    }
  }, [showForm]);

  // Check if the current user is the admin of the subreddit
  const isAdmin = session?.user?.id === admin_id;

  async function handleDeeleteSubreddit() {
    // Implement the delete subreddit logic here

    const confirmDelete = confirm(
      "Are you sure you want to delete this subreddit? This action cannot be undone.",
    );

    if (!isAdmin) {
      alert("You do not have permission to delete this subreddit.");
      return;
    }

    if (confirmDelete) {
      await deleteSubredditBySlug(slug);
      // Optionally, redirect the user after deletion
      window.location.href = "/";
      alert("Subreddit deleted successfully.");
    }
  }

  return (
    <>
      <section>
        <img
          src="https://placehold.co/600x400"
          className="h-32 w-full object-cover"
          alt="cover"
        />
        <div className="relative flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <img
              src={`https://avatar.iran.liara.run/username?username=${subreddit.name.replace(" ", "+")}`}
              className="absolute -top-12 h-28 w-28 rounded-full border-4 border-white"
              alt={subreddit.name}
            />
            <h1 className="ml-32 text-end text-2xl font-bold">
              r/{subreddit.name}
            </h1>
          </div>
          <div className="flex flex-1 justify-end gap-4">
            <Button
              className={"flex gap-2 px-2 py-1"}
              onClick={() => setShowForm(!showForm)}
            >
              <Plus />
              Create a post
            </Button>
            {isAdmin && (
              <Button
                buttonType="delete"
                className="border border-red-300 px-2 py-1"
                onClick={handleDeeleteSubreddit}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-1 gap-4">
        <div className="flex-1 space-y-4">
          {shouldRenderForm && (
            <div className={showForm ? "animate-fade-in" : "animate-fade-out"}>
              <PostForm slug={slug} />
            </div>
          )}

          <PostsList subredditPosts={posts} />
        </div>
        <Sidebar position="right" sidebarWidth={"w-1/3"}>
          <p>{description}</p>
        </Sidebar>
      </section>
    </>
  );
}

export default SubredditPage;
