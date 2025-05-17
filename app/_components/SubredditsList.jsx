import { getAllSubreddits } from "@/_services/subreddits";
import Link from "next/link";

async function SubredditsList() {
  const { subreddits } = await getAllSubreddits();
  return (
    <section className="space-y-4 rounded-2xl bg-white p-4 shadow ">
      {subreddits.map((subreddit) => (
        <Link
          href={`/subreddit/${subreddit.slug}`}
          key={subreddit.id}
          className="block"
        >
          <p>r/{subreddit.name}</p>
        </Link>
      ))}
    </section>
  );
}

export default SubredditsList;
