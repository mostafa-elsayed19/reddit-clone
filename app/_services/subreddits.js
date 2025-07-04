import { supabase } from "@/_lib/supabase";
import { joinSubreddit } from "./memberships";

export async function getAllSubreddits() {
  const { data: subreddits, error } = await supabase
    .from("subreddits")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching subreddits:", error);
    return [];
  }

  return { subreddits };
}

export async function createSubreddit(newSubreddit) {
  const { data: subreddit, error } = await supabase
    .from("subreddits")
    .insert([{ ...newSubreddit }])
    .select()
    .single();

  if (error) {
    console.error("Error creating subreddit:", error);
    return { state: false, message: "Error creating subreddit" };
  }

  const { admin_id: userId, name, id: subredditId } = subreddit;

  await joinSubreddit(subredditId, userId, name);

  return {
    state: true,
    message: `Subreddit r/${newSubreddit.name} created successfully!`,
  };
}

export async function getSubredditBySlug(slug) {
  const { data: subreddit, error } = await supabase
    .from("subreddits")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching subreddit by slug:", error);
    return null;
  }

  return { subreddit };
}

export async function deleteSubredditBySlug(slug) {
  const { error } = await supabase.from("subreddits").delete().eq("slug", slug);

  if (error) {
    console.error("Error deleting subreddit by slug:", error);
    return { state: false, message: `Error deleting r/${slug}` };
  }

  return {
    state: true,
    message: `Subreddit r/${slug} deleted successfully!`,
  };
}

export async function updateSubreddit(slug, updatedData) {
  const { error } = await supabase
    .from("subreddits")
    .update(updatedData)
    .eq("slug", slug);

  if (error) {
    console.error("Error updating subreddit:", error);
    return { state: false, message: `Error updating r/${updatedData.name}` };
  }

  return {
    state: true,
    message: `Subreddit r/${updatedData.name} updated successfully!`,
  };
}
