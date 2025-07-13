import { Forward } from "lucide-react";
import { useState } from "react";

function ShareButton({ postId }) {
  const [copied, setCopied] = useState(false);

  function handleShare() {
    let url = window.location.href;
    if (postId) {
      url = `${window.location.origin}/post/${postId}`;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div
      className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-3 text-gray-500 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
      onClick={(e) => {
        e.stopPropagation();
        handleShare();
      }}
    >
      <Forward />
      {copied && <span className="text-xs text-green-600">Copied!</span>}
    </div>
  );
}

export default ShareButton;
