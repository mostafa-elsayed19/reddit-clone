import Wrapper from "@/_components/Wrapper";
import AddPost from "@/_components/AddPost";
import PostsList from "@/_components/PostsList";

export default async function Home() {
  return (
    <Wrapper>
      {/* Post Form */}
      <AddPost />

      {/* Post List */}
      <PostsList />
    </Wrapper>
  );
}
