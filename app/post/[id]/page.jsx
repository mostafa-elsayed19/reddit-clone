import { getPostById } from "@/_services/posts";

import CommentForm from "@/_components/CommentForm";
import CommentsList from "@/_components/CommentsList";
import PostContent from "@/_components/PostContent";
import VoteSection from "@/_components/VoteSection";
import Wrapper from "@/_components/Wrapper";

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
      <section className="space-y-4 rounded bg-white p-4 shadow">
        <PostContent
          postId={postId}
          title={title}
          user_id={user_id}
          content={content}
          username={username}
          image={image}
        />

        <VoteSection votes={votes} votableId={postId} votableType="post" />

        <h2 className="text-xl font-semibold">{comments.length} Comments</h2>

        <CommentForm postId={postId} />
        <CommentsList comments={comments} />
      </section>
    </Wrapper>
  );
}

export default page;
