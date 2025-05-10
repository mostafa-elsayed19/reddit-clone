import Comment from "./Comment";

function CommentReply({ reply }) {
  if (!reply) return null;

  return <Comment comment={reply} />;
}

export default CommentReply;
