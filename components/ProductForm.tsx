"use client";

import { useEffect, useState } from "react";

export default function ProductForm({ refresh }: any) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.status === 400) {
      alert(data.error);
      return;
    }

    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setCategory("");

    refresh();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full border p-2 rounded mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        className="w-full mb-4"
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
          }
        }}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add Product
      </button>
    </form>
  );
}
