"use client";

import { getPostById } from "@/_services/posts";

import CommentForm from "@/_components/CommentForm";
import CommentsList from "@/_components/CommentsList";
import PostContent from "@/_components/PostContent";
import VoteSection from "@/_components/VoteSection";
import Wrapper from "@/_components/Wrapper";
import ShareButton from "@/_components/ShareButton";
import CommentButton from "@/_components/CommentButton";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

function page() {
  const commentInputRef = useRef(null);
  const [post, setPost] = useState({});
  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const { id: postId } = useParams();

  // const { id: postId } = await params;

  // const { post } = await getPostById(postId);

  // const votes = upvotes - downvotes;

  useEffect(() => {
    async function fetchPost() {
      const { post } = await getPostById(postId);
      setPost(post);

      const { upvotes, downvotes, comments } = post;

      const votes = upvotes - downvotes;

      setVotes(votes);
      setComments(comments);
    }
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (window.location.hash === "#comment" && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper>
      <section className="space-y-4 rounded bg-white p-4 shadow">
        <PostContent post={post} />

        <div className="flex items-center gap-2">
          <VoteSection votes={votes} votableId={postId} votableType="post" />
          <CommentButton commentsCount={comments.length} />
          <ShareButton />
        </div>

        <CommentForm postId={postId} ref={commentInputRef} />
        <CommentsList comments={comments} />
      </section>
    </Wrapper>
  );
}

export default page;
