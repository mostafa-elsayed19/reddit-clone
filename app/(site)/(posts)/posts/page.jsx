import PostForm from "@/_components/PostForm";
import PostsList from "@/_components/PostsList";
import Wrapper from "@/_components/Wrapper";

function page() {
  return (
    <Wrapper>
      <PostForm />
      <PostsList />
    </Wrapper>
  );
}

export default page;
