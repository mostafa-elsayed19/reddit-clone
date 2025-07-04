import { supabase } from "@/_lib/supabase";

export async function joinSubreddit(subredditId, userId, subredditName) {
  const isUserSubscibed = await isUserSubscribedToSubreddit(
    subredditId,
    userId,
  );

  if (isUserSubscibed) {
    return {
      state: false,
      message: `User is already a member of r/${subredditName}.`,
    };
  }

  const { error } = await supabase
    .from("memberships")
    .insert([{ subreddit_id: subredditId, user_id: userId }])
    .select();

  if (error && error.code !== "PGRST116") {
    console.error("Error joining subreddit:", error);
    return { state: false, message: `Error joining r/${subredditName}` };
  }

  return { state: true, message: `Successfully joined r/${subredditName}` };
}

export async function leaveSubreddit(subredditId, userId, subredditName) {
  const { error } = await supabase
    .from("memberships")
    .delete()
    .match({ subreddit_id: subredditId, user_id: userId })
    .select();

  if (error && error.code !== "PGRST116") {
    console.error("Error leaving subreddit:", error);
    return { state: false, message: `Error leaving r/${subredditName}` };
  }

  return { state: true, message: `Successfully left r/${subredditName}` };
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
    .select("subreddit_id, subreddits(name, id, slug)")
    .eq("user_id", userId);

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching user memberships:", error);
    throw error;
  }

  const memberships = data.map((membership) => {
    const { name, id, slug } = membership.subreddits;
    return {
      id,
      name,
      slug,
    };
  });

  return { memberships };
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
