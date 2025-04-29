import { supabase } from "@/_lib/supabase";

export async function updateVoteForPost(postId, userId, type) {
  if ((!postId, !userId, !["up", "down"].includes(type))) {
    console.warn("Missing userId, postId, or invalid vote type");
    return;
  }

  const { data: existingVote, error: fetchError } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  // Error getting the existing vote
  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching existing vote:", fetchError);
    return;
  }

  if (existingVote && existingVote.type === type) {
    // If the vote already exists and is the same type, remove it
    return await removeVoteForPost(postId, userId);
  }

  if (existingVote && existingVote.type !== type) {
    const { error: updateError } = await supabase
      .from("votes")
      .update({ type })
      .eq("id", existingVote.id);

    if (updateError) {
      console.error("Error updating vote:", updateError);
    }
    return;
  }

  const { error: insertError } = await supabase
    .from("votes")
    .insert([{ post_id: postId, user_id: userId, type }]);

  if (insertError) {
    console.error("Error inserting vote:", insertError);
  }
}

export async function removeVoteForPost(postId, userId) {
  if (!userId || !postId) {
    console.warn("Missing userId or postId");
    return false;
  }

  const { error } = await supabase
    .from("votes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting vote:", error);
  }
}

export async function getVotesCountForPost(postId) {
  const { count: upvotes } = await supabase
    .from("votes")
    .select("", { count: "exact" })
    .eq("post_id", postId)
    .eq("type", "up");

  const upvotesCount = upvotes || 0;

  const { count: downvotes } = await supabase
    .from("votes")
    .select("", { count: "exact" })
    .eq("post_id", postId)
    .eq("type", "down");

  const downvotesCount = downvotes || 0;

  console.log("Votes count:", {
    upvotes: upvotesCount,
    downvotes: downvotesCount,
  });

  return { upvotes: upvotesCount, downvotes: downvotesCount };
}
