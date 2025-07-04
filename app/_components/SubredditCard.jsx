import Link from "next/link";

function SubredditCard({ subreddit }) {
  return (
    <Link href={`/subreddit/${subreddit.slug}`} className="block">
      <p>r/{subreddit.name}</p>
    </Link>
  );
}

export default SubredditCard;
