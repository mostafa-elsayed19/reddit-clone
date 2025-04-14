import { getPosts } from "@/_services/getPosts";
import PostCard from "./PostCard";

async function PostsList() {
  const { posts } = await getPosts();
  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostsList;
