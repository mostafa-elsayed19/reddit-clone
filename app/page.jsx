import Link from "next/link";
import Navbar from "@/_components/Navbar";
import AddPost from "@/_components/AddPost";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4">
      {/* Navbar */}
      <Navbar />
      {/* Post Form */}
      <AddPost />

      {/* Post List */}
      <section className="space-y-4">
        {[1, 2, 3].map((id) => (
          <article
            key={id}
            className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow"
          >
            <div className="flex flex-col items-center text-gray-500">
              <button>🔼</button>
              <span>12</span>
              <button>🔽</button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Sample Post Title {id}</h3>
              <p className="mb-1 text-sm text-gray-500">
                Posted by user{id} • 2 hours ago
              </p>
              <p className="text-sm text-gray-700">
                This is a sample post content preview...
              </p>
              <Link
                href={`/post/${id}`}
                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
              >
                View Comments (3)
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
