function PostContent({ title, content, username }) {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p className="mb-4 text-sm text-gray-500">
        Posted by {username} • 2 hours ago
      </p>
      <div className="mb-6 text-gray-800">{content}</div>
    </>
  );
}

export default PostContent;
