import Logout from "./Logout";

function User({ user }) {
  const { name, image, username, avatar } = user;
  return (
    <ul className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <li>
          <img
            src={`${image ? image : avatar ? avatar : "https://avatar.iran.liara.run/public/boy"}`}
            alt="user profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </li>
        <li>{name || username}</li>
      </div>
      <Logout />
    </ul>
  );
}

export default User;
