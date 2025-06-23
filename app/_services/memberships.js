import { supabase } from "@/_lib/supabase";

export async function joinSubreddit(subredditId, userId) {
  const isUserSubscibed = await isUserSubscribedToSubreddit(
    subredditId,
    userId,
  );

  if (isUserSubscibed) {
    alert("User is already a member of this subreddit.");
    return;
  }

  const { error } = await supabase
    .from("memberships")
    .insert([{ subreddit_id: subredditId, user_id: userId }])
    .select();

  if (error && error.code !== "PGRST116") {
    console.error("Error joining subreddit:", error);
    throw error;
  }

  return;
}

export async function leaveSubreddit(subredditId, userId) {
  const { error } = await supabase
    .from("memberships")
    .delete()
    .match({ subreddit_id: subredditId, user_id: userId })
    .select();

  if (error && error.code !== "PGRST116") {
    console.error("Error leaving subreddit:", error);
    throw error;
  }

  return;
}

export async function getSubredditMemberships(subredditId) {
  const { data, error } = await supabase
    .from("memberships")
    .select("user_id")
    .eq("subreddit_id", subredditId);

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching subreddit memberships:", error);
    throw error;
  }

  return data.map((membership) => membership.user_id);
}

export async function getUserMemberships(userId) {
  const { data, error } = await supabase
    .from("memberships")
    .select("subreddit_id")
    .eq("user_id", userId);

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching user memberships:", error);
    throw error;
  }

  return data.map((membership) => membership.subreddit_id);
}

export async function isUserSubscribedToSubreddit(subredditId, userId) {
  if (!subredditId || !userId) return false;
  const { data, error } = await supabase
    .from("memberships")
    .select("*")
    .eq("subreddit_id", subredditId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking user subscription:", error);
  }

  return !!data; // Returns true if the user is subscribed, false otherwise
}
