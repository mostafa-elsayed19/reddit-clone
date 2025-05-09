import Logout from "./Logout";

function User({ user }) {
  const { username, avatar } = user;
  const upperCaseUsername = username
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
  return (
    <ul className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex w-full items-center gap-4">
        <li>
          <img
            src={avatar}
            alt="user profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </li>
        <li>{upperCaseUsername}</li>
      </div>

      <div>
        <Logout />
      </div>
    </ul>
  );
}

export default User;
