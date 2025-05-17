import PostForm from "@/_components/PostForm";
import PostsList from "@/_components/PostsList";
import Wrapper from "@/_components/Wrapper";
import { getPostsBySubredditSlug } from "@/_services/posts";

async function page({ params }) {
  const { id: slug } = await params;
  const { posts } = await getPostsBySubredditSlug(slug);

  return (
    <Wrapper>
      <PostForm slug={slug} />
      <PostsList subredditPosts={posts} />
    </Wrapper>
  );
}

export default page;
