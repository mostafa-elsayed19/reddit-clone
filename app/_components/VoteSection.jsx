"use client";
import { updateVoteForPost } from "@/_services/votes";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function VoteSection({ flex_direction = "flex-row", votes, postId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;
  async function handleVote(type) {
    await updateVoteForPost(postId, userId, type);
    router.refresh();
  }

  return (
    <>
      <div
        className={`mb-6 flex items-center gap-2 text-gray-500 ${flex_direction}`}
      >
        <button className="cursor-pointer text-gray-500 hover:text-blue-500">
          <ArrowBigUp onClick={() => handleVote("up")} />
        </button>
        <span>{votes}</span>
        <button className="cursor-pointer text-gray-500 hover:text-gray-700">
          <ArrowBigDown onClick={() => handleVote("down")} />
        </button>
      </div>
    </>
  );
}

export default VoteSection;
