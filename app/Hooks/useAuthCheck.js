import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function useAuthCheck() {
  const { data: session, status } = useSession();

  function checkAuth() {
    if (!session?.user) {
      // toast("You must be logged in to perform this action.");
      // Redirect to login page
      return {
        state: false,
        message: "You must be logged in to perform this action.",
      };
    }
    return { state: true, message: "User is authenticated." };
  }

  return { checkAuth };
}

export default useAuthCheck;
