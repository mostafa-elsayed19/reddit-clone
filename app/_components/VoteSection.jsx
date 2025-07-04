"use client";
import { getVoteType, updateVote, getVotesCount } from "@/_services/votes";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useAuthCheck from "@/Hooks/useAuthCheck";

function VoteSection({ votes: initialVotes, votableType, votableId }) {
  const { checkAuth } = useAuthCheck();
  const { data: session } = useSession();
  const [userVoteType, setUserVoteType] = useState("");
  const [votes, setVotes] = useState(initialVotes || 0);
  const router = useRouter();

  const userId = session?.user.id;

  // Update local votes when initialVotes prop changes
  useEffect(() => {
    setVotes(initialVotes || 0);
  }, [initialVotes]);

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

    // Update the user's vote type immediately for UI feedback
    if (userVoteType === type) {
      setUserVoteType("");
    } else {
      setUserVoteType(type);
    }

    // Update the vote in the database
    await updateVote(newVote);

    // Fetch the updated vote count
    const { upvotes, downvotes } = await getVotesCount(votableId);
    const newVoteCount = upvotes - downvotes;
    setVotes(newVoteCount);
  }

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex w-fit cursor-default items-center gap-2 rounded-full border border-gray-300 text-gray-500`}
      >
        <button
          className={`cursor-pointer rounded-full border border-transparent hover:border-blue-500 hover:text-blue-500 ${userVoteType === "up" ? "text-blue-500" : "text-gray-500"}`}
        >
          <ArrowBigUp onClick={() => handleVote("up")} />
        </button>
        <span>{votes}</span>
        <button
          className={`cursor-pointer rounded-full border border-transparent hover:border-gray-700 hover:text-gray-700 ${userVoteType === "down" ? "text-gray-700" : "text-gray-500"}`}
        >
          <ArrowBigDown onClick={() => handleVote("down")} />
        </button>
      </div>
    </>
  );
}

export default VoteSection;
