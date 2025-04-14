import { supabase } from "@/_lib/supabase";

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return null;
  }

  return { posts };
}
