"use client";

import { useState } from "react";
import InputField from "@/_components/InputField";
import Button from "@/_components/Button";

export default function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle login logic here
		console.log("Form submitted:", formData);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					Login
				</h2>
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
					<Button type="submit">Login</Button>
				</form>
				<p className="text-sm text-center text-gray-600">
					Don't have an account?{" "}
					<a href="/register" className="text-blue-500 hover:underline">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
