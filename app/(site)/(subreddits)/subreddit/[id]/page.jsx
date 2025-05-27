import SubredditPage from "@/_components/SubredditPage";
import Wrapper from "@/_components/Wrapper";
import { getPostsBySubredditSlug } from "@/_services/posts";
import { getSubredditBySlug } from "@/_services/subreddits";
import { authOptions } from "@/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";

async function page({ params }) {
  const { id: slug } = await params;
  const session = await getServerSession(authOptions);
  const { subreddit } = await getSubredditBySlug(slug);
  const { posts } = await getPostsBySubredditSlug(slug);

  return (
    <Wrapper className={"flex flex-col gap-4"}>
      <SubredditPage subreddit={subreddit} posts={posts} slug={slug} />
      {/* <section>
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
          <div className="flex flex-1 justify-end gap-8">
            <Button className={"flex gap-2 px-2 py-1"}>
              <Plus />
              Create a post
            </Button>
            {isAdmin && (
              <Button
                buttonType="delete"
                className="border border-red-300 px-2 py-1"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-1 gap-4">
        <div className="flex-1 space-y-4">
          {<PostForm slug={slug} />}
          <PostsList subredditPosts={posts} />
        </div>
        <Sidebar position="right" sidebarWidth={"w-1/3"}>
          <p>{description}</p>
        </Sidebar>
      </section> */}
    </Wrapper>
  );
}

export default page;
