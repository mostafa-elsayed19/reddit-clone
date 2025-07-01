"use client";
import { useState } from "react";
import Logout from "./Logout";
import OptionsMenu from "./OptionsMenu";

function User({ user }) {
  const { username, avatar } = user;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const upperCaseUsername = username
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
  return (
    <ul className="flex flex-col justify-between gap-4 rounded-lg bg-white p-4 shadow-md md:flex-row">
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

      {/* <OptionsMenu setIsOpen={setIsOpenMenu} isOpen={isOpenMenu}> */}

      <Logout />

      {/* </OptionsMenu> */}
    </ul>
  );
}

export default User;
