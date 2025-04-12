"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import User from "./User";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

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
