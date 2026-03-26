"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token),
        localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } else {
      alert(data.error || "Login Failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg p-8 rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full py-2 rounded text-white"
        >
          Login
        </button>
        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
