"use client";

import Providers from "@/providers";
import "@/globals.css";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-100">
        <Providers>
          <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
