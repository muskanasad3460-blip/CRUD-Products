"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    }

    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        MyShop
      </Link>

      <div className="flex items-center bg-white rounded overflow-hidden w-[40%]">
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              router.push("/categories");
            } else {
              router.push(`/category/${value}`);
            }
          }}
          className="bg-gray-100 text-black px-3 py-2 outline-none"
        >
          <option value="">All</option>
          {categories.map((c: any) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 text-black outline-none"
        />

        <button className="bg-yellow-400 px-4 py-2 text-black">🔍</button>
      </div>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="hidden md:block">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
