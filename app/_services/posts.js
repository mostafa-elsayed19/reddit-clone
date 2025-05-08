import { supabase } from "@/_lib/supabase";
import { getVotesCount } from "./votes";

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
    // .select("*,votes(*), comments(*), users(username)")
    .select("*, comments(*), users(username)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return null;
  }

  const postsWithVotes = await Promise.all(
    posts.map(async (post) => {
      const votes = await getVotesCount(post.id);
      return { ...post, ...votes };
    }),
  );

  return { posts: postsWithVotes };
  // return { posts };
}

export async function getPostById(id) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, users(username), comments(*, users(username))")
    .order("created_at", { ascending: false })
    .eq("id", id)
    .single();

  const postVotes = await getVotesCount(post.id);

  const commentVotes = await Promise.all(
    post.comments.map(async (comment) => {
      const votes = await getVotesCount(comment.id);
      return { ...comment, ...votes };
    }),
  );

  const postWithVotes = { ...post, ...postVotes, comments: commentVotes };

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
