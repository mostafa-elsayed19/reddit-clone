import { supabase } from "@/_lib/supabase";

// export async function getCommentsByPostId(postId) {
//   const { data: comments, error } = await supabase
//     .from("comments")
//     .select("*")
//     .eq("post_id", postId)
//     .order("created_at", { ascending: false });

//   if (error) {
//     throw new Error("Error getting all comments", error.message);
//   }

//   return { comments };
// }

export async function addComment(newComment) {
  const { error } = await supabase
    .from("comments")
    .insert([{ ...newComment, edited: false }]);

  if (error) {
    throw new Error("Error adding a comment", error.message);
  }
}

export async function editComment(commentId, content) {
  const { error } = await supabase
    .from("comments")
    .update({ content, edited: true })
    .eq("id", commentId);

  if (error) {
    throw new Error("Error editing a comment", error.message);
  }
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error("Error deleting a comment", error.message);
  }
}
