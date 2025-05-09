import { MessageCircle } from "lucide-react";

function CommentButton({ commentsCount }) {
  return (
    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-3 text-gray-500 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700">
      <MessageCircle size={22} /> {commentsCount}
    </div>
  );
}

export default CommentButton;
