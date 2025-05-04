"use client";
import { getVoteTypeForPost, updateVoteForPost } from "@/_services/votes";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function VoteSection({ flex_direction = "flex-row", votes, postId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [userVoteType, setUserVoteType] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function getVoteType() {
      const voteType = await getVoteTypeForPost(postId, userId);
      setUserVoteType(voteType);
    }
    getVoteType();
  }, [postId, userId]);

  async function handleVote(type) {
    await updateVoteForPost(postId, userId, type);
    if (userVoteType === type) {
      setUserVoteType("");
    } else {
      setUserVoteType(type);
    }
    router.refresh();
  }

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`mb-6 flex cursor-default items-center gap-2 text-gray-500 ${flex_direction} `}
      >
        <button
          className={`cursor-pointer hover:text-blue-500 ${userVoteType === "up" ? "text-blue-500" : "text-gray-500"}`}
        >
          <ArrowBigUp onClick={() => handleVote("up")} />
        </button>
        <span>{votes}</span>
        <button
          className={`cursor-pointer hover:text-gray-700 ${userVoteType === "down" ? "text-gray-700" : "text-gray-500"}`}
        >
          <ArrowBigDown onClick={() => handleVote("down")} />
        </button>
      </div>
    </>
  );
}

export default VoteSection;
