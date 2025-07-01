"use client";
import { signOut } from "next-auth/react";

import Button from "./Button";

function Logout() {
  async function handleLogout() {
    await signOut({ callbackUrl: "/" });
  }
  return (
    <Button type="submit" onClick={() => handleLogout()}>
      Logout
    </Button>
  );
}

export default Logout;
