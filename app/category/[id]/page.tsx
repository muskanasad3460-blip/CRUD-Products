"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();

      const filtered = data.filter((p: any) => p.category._id === id);

      setProducts(filtered);
    };

    if (id) fetchProducts();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Category Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} onDelete={() => {}} />
        ))}
      </div>
    </div>
  );
}
