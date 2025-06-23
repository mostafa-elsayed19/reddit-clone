import SubredditPage from "@/_components/SubredditPage";
import Wrapper from "@/_components/Wrapper";
import { getPostsBySubredditSlug } from "@/_services/posts";
import { getSubredditBySlug } from "@/_services/subreddits";

async function page({ params }) {
  const { id: slug } = await params;
  const { subreddit } = await getSubredditBySlug(slug);
  const { posts } = await getPostsBySubredditSlug(slug);

  return (
    <Wrapper className={"flex flex-col gap-4"}>
      <SubredditPage subreddit={subreddit} posts={posts} slug={slug} />
    </Wrapper>
  );
}

export default page;
