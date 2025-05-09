"use client";
import { signOut } from "next-auth/react";

import Button from "./Button";

function Logout() {
  async function handleLogout() {
    await signOut({ callbackUrl: "/" });
  }
  return (
    <Button type="submit" onClick={() => handleLogout()}>
      LogOut
    </Button>
  );
}

export default Logout;
