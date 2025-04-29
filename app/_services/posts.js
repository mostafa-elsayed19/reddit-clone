import { supabase } from "@/_lib/supabase";
import { getVotesCountForPost } from "./votes";

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

export async function getAllPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return null;
  }

  const postsWithVotes = await Promise.all(
    posts.map(async (post) => {
      const votes = await getVotesCountForPost(post.id);
      return { ...post, ...votes };
    }),
  );

  return { posts: postsWithVotes };
}

export async function getPostById(id) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .eq("id", id)
    .single();

  const postVotes = await getVotesCountForPost(post.id);

  const postWithVotes = { ...post, ...postVotes };

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return { post: postWithVotes };
}

export async function updatePost(id, editedPost) {
  const { data: updatedPost, error } = await supabase
    .from("posts")
    .update({ ...editedPost, updated_at: new Date(), edited: true })
    .eq("id", id);

  if (error) {
    console.error("Error updating post:", error);
    return null;
  }

  return { updatedPost };
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    return null;
  }

  return true;
}
