"use client";

import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import User from "./User";
import Wrapper from "./Wrapper";

function Navbar() {
  const { data: session } = useSession();
  // const router = useRouter();

  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [status]);

  if (hideNavbar) {
    return null;
  }

  return (
    <nav className="border-b border-gray-300">
      <Wrapper className="flex items-center justify-between">
        <h1 className="m-0 text-2xl font-bold">
          <Link href="/">Reddit Mini</Link>
        </h1>

        {session?.user ? (
          <User user={session.user} />
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </Wrapper>
    </nav>
  );
}

export default Navbar;
