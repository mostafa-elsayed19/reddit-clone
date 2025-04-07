"use client";

import Button from "../../_components/Button";
import InputField from "../../_components/InputField";
import { useState } from "react";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle registration logic here
		console.log("Form submitted:", formData);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					Register
				</h2>
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
					<Button type="submit">Register</Button>
				</form>
				<p className="text-sm text-center text-gray-600">
					Already have an account?{" "}
					<a href="/login" className="text-blue-500 hover:underline">
						Login
					</a>
				</p>
			</div>
		</div>
	);
}
