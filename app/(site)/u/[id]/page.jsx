"use client";

import Wrapper from "@/_components/Wrapper";

import PostCard from "@/_components/PostCard";
import CommentsList from "@/_components/CommentsList";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserById } from "@/_services/users";
import { formatDate } from "@/_services/helpers";
import { getPostsByUserId } from "@/_services/posts";
import { getCommentsByUserId } from "@/_services/comments";
import Comment from "@/_components/Comment";
import { getUserMemberships } from "@/_services/memberships";
import SubredditCard from "@/_components/SubredditCard";

const mockUser = {
  username: "johndoe",
  avatar: "https://placehold.co/64x64",
  joinDate: "Jan 2021",
  karma: 1234,
  about: "Just a Redditor who loves coding and coffee.",
};

const mockPosts = [
  {
    id: 1,
    title: "My first post!",
    upvotes: 10,
    downvotes: 2,
    created_at: "2023-01-01",
    users: { username: mockUser.username, avatar: mockUser.avatar },
    subreddits: { name: "reactjs" },
    comments: [{ id: 1 }],
  },
  {
    id: 2,
    title: "Check out this cool project",
    upvotes: 20,
    downvotes: 1,
    created_at: "2023-02-01",
    users: { username: mockUser.username, avatar: mockUser.avatar },
    subreddits: { name: "webdev" },
    comments: [{ id: 2 }, { id: 3 }],
  },
];

const mockComments = [
  {
    id: 1,
    content: "Great post!",
    upvotes: 5,
    downvotes: 0,
    created_at: "2023-03-01",
    updated_at: "2023-03-01",
    edited: false,
    post_id: 1,
    user_id: 1,
    users: { username: mockUser.username, avatar: mockUser.avatar },
    replies: [],
  },
  {
    id: 2,
    content: "Thanks for sharing.",
    upvotes: 3,
    downvotes: 0,
    created_at: "2023-03-02",
    updated_at: "2023-03-02",
    edited: false,
    post_id: 2,
    user_id: 1,
    users: { username: mockUser.username, avatar: mockUser.avatar },
    replies: [],
  },
];

const tabs = ["Posts", "Comments", "Subreddits", "Bookmarks", "About"];

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("Posts");
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [subreddits, setSubreddits] = useState([]);

  function formatUsername(username) {
    if (!username) return "";
    return username
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
  }

  useEffect(() => {
    const fetchUserWithPostsAndComments = async () => {
      const { email, created_at, username, avatar } = await getUserById(id);
      setUser({ email, created_at, username, avatar });

      const { posts } = await getPostsByUserId(id);
      setPosts(posts);

      const comments = await getCommentsByUserId(id);
      console.log(comments);
      setComments(comments);

      const { memberships } = await getUserMemberships(id);
      setSubreddits(memberships);
    };
    fetchUserWithPostsAndComments();
  }, [id]);

  return (
    <Wrapper>
      {/* Profile Header */}
      <section className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-md md:flex-row md:items-end md:gap-8">
        <img
          src={user?.avatar}
          alt="User avatar"
          className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
        />
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold">
            u/{formatUsername(user?.username)}
          </h2>
          <div className="mt-2 flex gap-4 text-gray-500">
            <span>Joined {formatDate(user?.created_at)}</span>
            <span>•</span>
            <span>{user?.karma} karma</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="mt-6 flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer rounded-t-lg px-4 py-2 font-semibold transition-colors duration-150 focus:outline-none ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow"
                : "bg-gray-100 text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <section>
        {activeTab === "Posts" &&
          (posts.length === 0 ? (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p>No Posts found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ))}
        {activeTab === "Comments" &&
          (comments.length === 0 ? (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p>No Comments found</p>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-md">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} isLink={true} />
              ))}
            </div>
          ))}
        {activeTab === "Subreddits" &&
          (subreddits.length === 0 ? (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p>No Subreddits found</p>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-md">
              {subreddits.map((subreddit) => (
                <SubredditCard subreddit={subreddit} key={subreddit.id} />
              ))}
            </div>
          ))}
        {activeTab === "Bookmarks" && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <p>No bookmarks found</p>
          </div>
        )}
        {activeTab === "About" && (
          <div className="prose max-w-none rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-bold">
              About u/{formatUsername(user?.username)}
            </h3>
            <p>{mockUser.about}</p>
          </div>
        )}
      </section>
    </Wrapper>
  );
}
