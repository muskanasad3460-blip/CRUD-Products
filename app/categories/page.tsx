"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
};

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => router.push("/categories")}
        className="bg-gray-200 text-black px-3 py-2 rounded"
      >
        All Categories
      </button>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c._id}
            onClick={() => router.push(`/?category=${c._id}`)}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-4xl mb-3">📦</div>
            <h2 className="text-lg font-semibold text-gray-800">{c.name}</h2>
            <p>Explore products in this category</p>
          </div>
        ))}
      </div>
    </div>
  );
}
