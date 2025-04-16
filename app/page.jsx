import Wrapper from "@/_components/Wrapper";
import PostForm from "@/_components/PostForm";
import PostsList from "@/_components/PostsList";

export default async function Home() {
  return (
    <Wrapper>
      {/* Post Form */}
      <PostForm />

      {/* Post List */}
      <PostsList />
    </Wrapper>
  );
}
