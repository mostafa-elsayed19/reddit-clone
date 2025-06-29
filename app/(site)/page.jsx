import Wrapper from "@/_components/Wrapper";

import SubredditsList from "../_components/SubredditsList";
import Sidebar from "../_components/Sidebar";
import PostsList from "../_components/PostsList";
import SubredditCreateToggleForm from "@/_components/SubredditCreateToggleForm";

export default async function Home() {
  return (
    <Wrapper className="mx-0 flex flex-1 flex-col">
      <SubredditCreateToggleForm />
      <div className="md:flex md:flex-1 md:gap-2">
        <div className="md:w-3/5">
          <PostsList />
        </div>
        <Sidebar
          position={"right"}
          data={<SubredditsList />}
          sidebarWidth={"flex-1"}
          toggleButton={false}
        />
      </div>
    </Wrapper>
  );
}
