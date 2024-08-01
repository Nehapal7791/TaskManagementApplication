"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/url";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });
      toast.success("Logged in successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-purple-800">
      <div
        className="bg-white rounded shadow-md"
        style={{
          width: "600px",
          height: "456px",
          marginTop: "50px",
          borderRadius: "16px",
          borderWidth: "1px",
          padding: "60px",
          gap: "32px",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Welcome to <span className="text-purple-800">Workflo</span>!
        </h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-black text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-800">
            Create a new account.
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
