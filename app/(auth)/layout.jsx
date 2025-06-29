"use client";

import Providers from "@/providers";
import "@/globals.css";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <Providers>
          <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 px-6 shadow-md">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
