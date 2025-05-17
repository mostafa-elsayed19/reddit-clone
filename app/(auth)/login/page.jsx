"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import InputField from "@/_components/InputField";
import Button from "@/_components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle login logic here
    signIn("credentials", {
      ...formData,
      callbackUrl: "/",
    });
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <Button type="submit" fullWidth={true}>
          Login
        </Button>
      </form>
      <Button
        type="submit"
        fullWidth={true}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in with google
      </Button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
}
