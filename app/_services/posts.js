import { supabase } from "@/_lib/supabase";

export async function createPost(newPost) {
  const { error } = await supabase
    .from("posts")
    .insert([
      {
        ...newPost,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    return;
  }

  console.log("Data inserted successfully:", newPost);
}

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

export async function getPost(id) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return { post };
}
