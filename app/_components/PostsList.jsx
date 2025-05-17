"use client";

import { getAllPosts } from "@/_services/posts";

import PostCard from "./PostCard";
import { useEffect, useState } from "react";

function PostsList({ subredditPosts }) {
  const [renderedPosts, setRenderedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { posts } = await getAllPosts();
      setRenderedPosts(posts);
    };

    if (!subredditPosts) {
      fetchPosts();
    } else {
      setRenderedPosts(subredditPosts);
    }
  }, []);

  return (
    <section className="space-y-4">
      {renderedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostsList;
