import Logout from "./Logout";

function User({ user }) {
  const { username, avatar } = user;
  return (
    <ul className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex w-full items-center gap-4">
        <li>
          <img
            src={`${avatar ? avatar : "https://avatar.iran.liara.run/public/boy"}`}
            alt="user profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </li>
        <li>{username}</li>
      </div>

      <div>
        <Logout />
      </div>
    </ul>
  );
}

export default User;
