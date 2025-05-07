import Comment from "./Comment";

function CommentsList({ comments }) {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentsList;
