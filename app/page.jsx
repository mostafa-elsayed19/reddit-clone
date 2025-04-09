import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-300 py-4">
        <h1 className="text-2xl font-bold">Reddit Mini</h1>
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </nav>

      {/* Post Form */}
      <section className="rounded-2xl bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">Create a Post</h2>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-xl border px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <textarea
            placeholder="Say something..."
            rows={3}
            className="w-full rounded-xl border px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      </section>

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
