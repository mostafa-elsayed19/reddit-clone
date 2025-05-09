import { getPostById } from "@/_services/posts";

import CommentForm from "@/_components/CommentForm";
import CommentsList from "@/_components/CommentsList";
import PostContent from "@/_components/PostContent";
import VoteSection from "@/_components/VoteSection";
import Wrapper from "@/_components/Wrapper";
import { Share } from "lucide-react";
import ShareButton from "@/_components/ShareButton";
import CommentButton from "@/_components/CommentButton";

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
    created_at,
    updated_at,
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
          created_at={created_at}
          updated_at={updated_at}
          image={image}
        />

        <div className="flex items-center gap-2">
          <VoteSection votes={votes} votableId={postId} votableType="post" />
          <CommentButton commentsCount={comments.length} />
          <ShareButton />
        </div>

        <CommentForm postId={postId} />
        <CommentsList comments={comments} />
      </section>
    </Wrapper>
  );
}

export default page;
