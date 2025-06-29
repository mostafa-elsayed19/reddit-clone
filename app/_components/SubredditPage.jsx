"use client";

import { useSession } from "next-auth/react";
import Button from "@/_components/Button";
import PostForm from "@/_components/PostForm";
import PostsList from "@/_components/PostsList";
import Sidebar from "@/_components/Sidebar";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteSubredditBySlug } from "@/_services/subreddits";
import OptionsMenu from "./OptionsMenu";
import SubredditForm from "./SubredditForm";
import {
  isUserSubscribedToSubreddit,
  joinSubreddit,
  leaveSubreddit,
} from "@/_services/memberships";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SubredditPage({ subreddit, posts, slug }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { description, admin_id } = subreddit;
  const [showForm, setShowForm] = useState(false);
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);

  useEffect(() => {
    async function checkUserSubscription() {
      const isUserSubscribed = await isUserSubscribedToSubreddit(
        subreddit.id,
        session?.user?.id,
      );
      setIsUserSubscribed(isUserSubscribed);
    }

    checkUserSubscription();
  }, [session, subreddit.id]);

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

  async function handleDeleteSubreddit() {
    // Implement the delete subreddit logic here

    const confirmDelete = confirm(
      "Are you sure you want to delete this subreddit? This action cannot be undone.",
    );

    if (!isAdmin) {
      toast.error("You do not have permission to delete this subreddit.");
      return;
    }

    if (confirmDelete) {
      const data = await deleteSubredditBySlug(slug);
      // Optionally, redirect the user after deletion
      router.replace("/");
      if (!data.state) {
        toast.error(data.message);
      }
      toast.success(data.message);
    }
  }

  async function handleJoinLeaveSubreddit(state) {
    if (!session) {
      toast.error("You must be logged in to join a subreddit.");
      return;
    }

    const userId = session.user.id;
    const subredditId = subreddit.id;
    const subredditName = subreddit.name;

    let data = {};

    switch (state) {
      case "join":
        data = await joinSubreddit(subredditId, userId, subredditName);
        setIsUserSubscribed(true);
        if (!data.state) {
          toast.error(data.message);
        }
        toast.success(data.message);
        break;
      case "leave":
        data = await leaveSubreddit(subredditId, userId, subredditName);
        setIsUserSubscribed(false);
        if (!data.state) {
          toast.error(data.message);
        }
        toast.success(data.message);
        break;
      default:
        console.error("Invalid state for joining/leaving subreddit:", state);
        return;
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
          <div className="flex flex-1 items-center gap-4">
            <img
              // src={`https://avatar.iran.liara.run/username?username=${subreddit.name.replace(" ", "+")}`}
              src={`https://placehold.co/600x400`}
              className="absolute -top-12 h-28 w-28 rounded-full border-4 border-white"
              alt={subreddit.name}
            />
            <h1 className="ml-32 text-end text-2xl font-bold">
              r/{subreddit.name}
            </h1>
          </div>

          <div className="flex gap-8">
            {!isAdmin &&
              (isUserSubscribed ? (
                <Button
                  buttonType="delete"
                  onClick={() => handleJoinLeaveSubreddit("leave")}
                >
                  Leave
                </Button>
              ) : (
                <Button onClick={() => handleJoinLeaveSubreddit("join")}>
                  Join
                </Button>
              ))}
            <div className="relative">
              <OptionsMenu setIsOpen={setIsOpenMenu} isOpen={isOpenMenu}>
                <li
                  className={"flex gap-2 px-2 py-1"}
                  onClick={() => setShowForm(!showForm)}
                >
                  <Plus />
                  Create a post
                </li>
                {isAdmin && (
                  <>
                    <li
                      onClick={() => {
                        setIsOpenMenu(false);
                        setIsOpenModal(true);
                      }}
                    >
                      Edit
                    </li>
                    <li
                      // buttonType="delete"
                      className="hover:text-red-500"
                      onClick={handleDeleteSubreddit}
                    >
                      Delete
                    </li>
                  </>
                )}
              </OptionsMenu>
            </div>
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

      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 -z-50 flex items-center justify-center bg-black opacity-50"></div>
          <div className="relative w-1/3 rounded-lg bg-white p-6 shadow-lg">
            <SubredditForm
              editMode={true}
              subredditSlug={slug}
              setIsOpenModal={setIsOpenModal}
              name={subreddit.name}
              description={subreddit.description}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300"
              onClick={() => setIsOpenModal(false)}
            >
              <X />
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default SubredditPage;
