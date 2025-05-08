import { supabase } from "@/_lib/supabase";

export async function updateVote(newVote) {
  const { type, user_id, votable_id, votable_type } = newVote;

  if (!votable_id || !user_id || !["up", "down"].includes(type)) {
    console.warn("Missing userId, postId, or invalid vote type");
    return;
  }

  const { data: existingVote, error: fetchError } = await supabase
    .from("votes")
    .select("*")
    .eq("votable_id", votable_id)
    .eq("user_id", user_id)
    .single();

  // Error getting the existing vote
  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching existing vote:", fetchError);
    return;
  }

  if (existingVote && existingVote.type === type) {
    // If the vote already exists and is the same type, remove it
    return await removeVote(votable_id, user_id);
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
    .insert([{ user_id, votable_id, votable_type, type }]);

  if (insertError) {
    console.error("Error inserting vote:", insertError);
  }
}

async function removeVote(votableId, userId) {
  if (!userId || !votableId) {
    console.warn("Missing userId or postId");
    return false;
  }

  const { error } = await supabase
    .from("votes")
    .delete()
    .eq("votable_id", votableId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting vote:", error);
  }
}

export async function getVotesCount(votableId) {
  const { count: upvotes } = await supabase
    .from("votes")
    .select("", { count: "exact" })
    .eq("votable_id", votableId)
    .eq("type", "up");

  const upvotesCount = upvotes || 0;

  const { count: downvotes } = await supabase
    .from("votes")
    .select("", { count: "exact" })
    .eq("votable_id", votableId)
    .eq("type", "down");

  const downvotesCount = downvotes || 0;

  return { upvotes: upvotesCount, downvotes: downvotesCount };
}

export async function getVoteType(votableId, userId) {
  if (!userId || !votableId) {
    return null;
  }

  const { data: existingVote, error } = await supabase
    .from("votes")
    .select("type")
    .eq("votable_id", votableId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.warn("Error fetching existing vote:", error);
    return null;
  }

  return existingVote ? existingVote.type : null;
}
