import OptionsMenu from "./OptionsMenu";

function PostContent({ title, content, username }) {
  return (
    <div className="relative flex flex-col justify-center gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">
        Posted by {username} • 2 hours ago
      </p>
      <p className="mb-6 text-gray-800">{content}</p>

      <OptionsMenu>
        <li>Edit</li>
        <li>Delete</li>
      </OptionsMenu>
    </div>
  );
}

export default PostContent;
