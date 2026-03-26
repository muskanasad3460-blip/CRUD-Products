"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product...
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Product not found
      </div>
    );

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.image}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-6">
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-[350px] object-cover rounded-xl hover:scale-105 transition"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
            {product.category?.name}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {product.name}
          </h1>

          <p className="text-2xl text-green-600 font-bold mt-3">
            ${product.price}
          </p>

          <div className="mt-5 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Product Description
            </h3>

            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Buy Now
            </button>

            <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
