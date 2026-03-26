"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );
      const data = await res.json();

      setProduct(data);
    };

    getProduct();
  }, [id]);

  const updateProduct = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
        onSubmit={updateProduct}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Edit Product
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
