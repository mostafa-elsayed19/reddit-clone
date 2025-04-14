import Wrapper from "./_components/Wrapper";
import Navbar from "@/_components/Navbar";
import AddPost from "@/_components/AddPost";
import PostsList from "./_components/PostsList";

export default async function Home() {
  return (
    <Wrapper>
      {/* Navbar */}
      <Navbar />
      {/* Post Form */}
      <AddPost />

      {/* Post List */}
      <PostsList />
    </Wrapper>
  );
}
