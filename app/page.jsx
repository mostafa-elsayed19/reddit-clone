import Link from "next/link";

export default function Home() {
	return (
		<main className="max-w-3xl mx-auto p-4 space-y-6">
			{/* Navbar */}
			<nav className="flex justify-between items-center py-4 border-b border-gray-300">
				<h1 className="text-2xl font-bold">Reddit Mini</h1>
				<Link href="/login" className="text-blue-600 hover:underline">
					Login
				</Link>
			</nav>

			{/* Post Form */}
			<section className="bg-white rounded-2xl shadow p-4">
				<h2 className="text-xl font-semibold mb-2">Create a Post</h2>
				<form className="space-y-3">
					<input
						type="text"
						placeholder="Title"
						className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
					/>
					<textarea
						placeholder="Say something..."
						rows={3}
						className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
					></textarea>
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
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
						className="bg-white rounded-2xl shadow p-4 flex items-start gap-4"
					>
						<div className="flex flex-col items-center text-gray-500">
							<button>🔼</button>
							<span>12</span>
							<button>🔽</button>
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold">
								Sample Post Title {id}
							</h3>
							<p className="text-sm text-gray-500 mb-1">
								Posted by user{id} • 2 hours ago
							</p>
							<p className="text-sm text-gray-700">
								This is a sample post content preview...
							</p>
							<Link
								href={`/post/${id}`}
								className="text-blue-600 text-sm hover:underline mt-2 inline-block"
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
