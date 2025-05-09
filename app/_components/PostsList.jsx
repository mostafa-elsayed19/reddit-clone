import { getAllPosts } from "@/_services/posts";

import PostCard from "./PostCard";

async function PostsList() {
  const { posts } = await getAllPosts();
  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostsList;
