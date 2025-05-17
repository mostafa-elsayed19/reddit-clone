import Wrapper from "@/_components/Wrapper";

import Link from "next/link";
import SubredditForm from "../_components/SubredditForm";
import SubredditsList from "../_components/SubredditsList";
import Sidebar from "../_components/Sidebar";
import PostsList from "../_components/PostsList";

export default async function Home() {
  return (
    <Wrapper className="mx-0 flex flex-1 flex-col">
      <Link href="/posts">Posts</Link>
      <SubredditForm />
      <div className="flex flex-1 gap-2">
        <div className="w-3/5">
          <PostsList />
        </div>
        <Sidebar
          position={"right"}
          subredditsList={<SubredditsList />}
          sidebarWidth={"flex-1"}
          toggleButton={false}
        />
      </div>
    </Wrapper>
  );
}
