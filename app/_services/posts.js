import { supabase } from "@/_lib/supabase";
import { getVotesCount } from "./votes";

function postsWithVotes(posts) {
  return Promise.all(
    posts.map(async (post) => {
      const votes = await getVotesCount(post.id);
      return { ...post, ...votes };
    }),
  );
}

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

export async function getAllPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    // .select("*,votes(*), comments(*), users(username)")
    .select("*, comments(*), users(username,avatar), subreddits(name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return null;
  }

  const returnedPostsWithVotes = await postsWithVotes(posts);

  return { posts: returnedPostsWithVotes };
}

export async function getPostById(id) {
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      "*, users(username), comments(*, users(username, avatar)), subreddits(name)",
    )
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

  // Recursively build the comment tree
  function commentTree(comments, parentId = null) {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => ({
        ...comment,
        replies: commentTree(comments, comment.id),
      }));
  }

  const commentsWithReplies = commentTree(commentVotes);

  const postWithVotes = {
    ...post,
    ...postVotes,
    comments: commentsWithReplies,
  };

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return { post: postWithVotes };
}

export async function getPostsBySubredditSlug(slug) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username, avatar)")
    .eq("subreddit_slug", slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by subreddit slug:", error);
    return null;
  }

  const returnedPostsWithVotes = await postsWithVotes(posts);

  return { posts: returnedPostsWithVotes };
}

export async function getPostsByUserId(id) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by userId:", error);
    return null;
  }

  const returnedPostsWithVotes = await postsWithVotes(posts);

  return { posts: returnedPostsWithVotes };
}

export async function getRandomPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching random posts:", error);
    return null;
  }

  const returnedPostsWithVotes = await postsWithVotes(posts);

  return { posts: returnedPostsWithVotes };
}

export async function getPostsBySearch(search) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .ilike("title", `%${search}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by search:", error);
    return null;
  }

  const returnedPostsWithVotes = await postsWithVotes(posts);

  return { posts: returnedPostsWithVotes };
}
