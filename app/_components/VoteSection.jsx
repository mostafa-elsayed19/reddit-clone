"use client";
import { getVoteType, updateVote } from "@/_services/votes";
import useAuthCheck from "@/Hooks/useAuthCheck";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function VoteSection({
  flex_direction = "flex-row",
  votes,
  votableType,
  votableId,
}) {
  const { checkAuth } = useAuthCheck();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [userVoteType, setUserVoteType] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function voteType() {
      const voteType = await getVoteType(votableId, userId);
      setUserVoteType(voteType);
    }
    voteType();
  }, [votableId, userId]);

  async function handleVote(type) {
    if (!checkAuth()) return;

    const newVote = {
      user_id: userId,
      votable_id: votableId,
      votable_type: votableType,
      type,
    };

    await updateVote(newVote);
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
        className={`flex cursor-default items-center gap-2 text-gray-500 ${flex_direction} `}
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
