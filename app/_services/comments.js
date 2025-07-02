import { supabase } from "@/_lib/supabase";
import { getVotesCount } from "./votes";

export async function addComment(newComment) {
  const { error } = await supabase
    .from("comments")
    .insert([{ ...newComment, edited: false }]);

  if (error) {
    throw new Error("Error adding a comment", error.message);
  }
}

export async function editComment(commentId, newComment) {
  const { error } = await supabase
    .from("comments")
    .update({ ...newComment, edited: true, updated_at: new Date() })
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

export async function getCommentsByUserId(id) {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, users(username, avatar)")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments by userId:", error);
    return null;
  }

  // Add vote data to each comment
  const commentsWithVotes = await Promise.all(
    comments.map(async (comment) => {
      const votes = await getVotesCount(comment.id);
      return { ...comment, ...votes };
    }),
  );

  return commentsWithVotes;
}
