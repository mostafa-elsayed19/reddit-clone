import Logout from "./Logout";

function User({ user }) {
  const { name, image } = user;
  console.log(image);
  return (
    <ul className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center gap-4">
        <li>
          <img
            src={`${image}`}
            alt="user profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </li>
        <li>{name}</li>
      </div>
      <Logout />
    </ul>
  );
}

export default User;
