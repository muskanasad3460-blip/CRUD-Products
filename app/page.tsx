"use client";

import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: { _id: string; name: string };
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchParams = useSearchParams();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const confirmDelete = async () => {
    if (!selectedId) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${selectedId}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p._id !== selectedId));
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const categoryFromUrl = searchParams.get("category");

    const matchCategory =
      !categoryFromUrl || p.category?._id === categoryFromUrl;

    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

        <ProductForm refresh={getProducts} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onDelete={(id) => {
                setSelectedId(id);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
