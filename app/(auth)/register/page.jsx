"use client";

import Button from "@/_components/Button";
import InputField from "@/_components/InputField";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { supabase } from "@/_lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle registration logic here

    const password_hash = await bcrypt.hash(formData.password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username: formData.username.toLowerCase(),
          email: formData.email.toLowerCase(),
          password_hash,
          avatar: `https://avatar.iran.liara.run/username?username=${formData.username.replace(" ", "+")}`,
          provider: "credentials",
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      return;
    }

    router.push("/login");
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-800">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required={true}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required={true}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required={true}
        />
        <Button type="submit" fullWidth={true}>
          Register
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </>
  );
}
