"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/url";
import axios from "axios";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const registerData = { name, email, password };

    console.log("Register data: ", registerData);

    try {
      const response = await axios.post(
        `${BASE_URL}/users/register`,
        registerData
      );

      console.log("Response status: ", response.status);

      if (response.status !== 201) {
        throw new Error("Registration failed");
      }
      const data = response.data;
      console.log("Registration successful: ", data);

      toast.success("Registered successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Registration error: ", error);
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-purple-800">
      <div
        className="bg-white rounded shadow-md"
        style={{
          width: "648px",
          height: "456px",
          marginTop: "50px",
          borderRadius: "16px",
          borderWidth: "1px",
          padding: "60px",
          gap: "32px",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black ">
          Welcome to
          <span className="text-purple-800"> Workflo</span>!
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded text-black"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border rounded text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded text-black pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <a href="/login" className="text-purple-800">
            Log in.
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
