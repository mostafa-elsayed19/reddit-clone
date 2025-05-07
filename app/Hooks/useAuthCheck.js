import { useSession } from "next-auth/react";

function useAuthCheck() {
  const { data: session, status } = useSession();

  function checkAuth() {
    if (!session?.user) {
      alert("You must be logged in to perform this action.");
      window.location.href = "/login"; // Redirect to login page
      return false;
    }
    return true;
  }

  return { checkAuth };
}

export default useAuthCheck;
