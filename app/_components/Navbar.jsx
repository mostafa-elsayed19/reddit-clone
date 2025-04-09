"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import User from "./User";

function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="flex items-center justify-between border-b border-gray-300 py-4">
      <h1 className="text-2xl font-bold">Reddit Mini</h1>

      {session?.user ? (
        <User user={session.user} />
      ) : (
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
