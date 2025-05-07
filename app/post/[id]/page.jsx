import CommentForm from "@/_components/CommentForm";
import CommentsList from "@/_components/CommentsList";
import PostContent from "@/_components/PostContent";
import VoteSection from "@/_components/VoteSection";
import Wrapper from "@/_components/Wrapper";
import { getPostById } from "@/_services/posts";

async function page({ params }) {
  const { id: postId } = await params;

  const { post } = await getPostById(postId);

  const {
    user_id,
    title,
    content,
    upvotes,
    downvotes,
    comments,

    users: { username },
    image,
  } = post;

  const votes = upvotes - downvotes;

  return (
    <Wrapper>
      <section className="rounded bg-white p-4 shadow">
        <PostContent
          postId={postId}
          title={title}
          user_id={user_id}
          content={content}
          username={username}
          image={image}
        />

        <VoteSection votes={votes} postId={postId} />

        <h2 className="mb-4 text-xl font-semibold">
          {comments.length} Comments
        </h2>

        <CommentForm postId={postId} />
        <CommentsList comments={comments} />
      </section>
    </Wrapper>
  );
}

export default page;
