"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}

export default Providers;
