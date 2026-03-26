"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful.Please Login");
      router.push("/login");
    } else {
      alert(data.error || "signup failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg p-8 rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="email"
          placeholder="Enter your Email"
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
          className="bg-green-500 w-full py-2 rounded text-white"
          type="submit"
        >
          SignUp
        </button>
      </form>
    </div>
  );
}
