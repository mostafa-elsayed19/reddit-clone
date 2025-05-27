import { supabase } from "@/_lib/supabase";

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
  const { error } = await supabase
    .from("subreddits")
    .insert([{ ...newSubreddit }]);

  if (error) {
    console.error("Error creating subreddit:", error);
    return null;
  }
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
    return null;
  }

  return true;
}
