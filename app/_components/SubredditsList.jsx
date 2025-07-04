import { getAllSubreddits } from "@/_services/subreddits";
import Link from "next/link";
import SubredditCard from "./SubredditCard";

async function SubredditsList() {
  const { subreddits } = await getAllSubreddits();
  if (subreddits < 1) return null;
  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow">
      {subreddits.map((subreddit) => (
        <SubredditCard subreddit={subreddit} key={subreddit.id} />
      ))}
    </section>
  );
}

export default SubredditsList;
