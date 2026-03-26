import { Product } from "@/app/page";
import Link from "next/link";

type TProductCard = {
  product: Product;
  onDelete: (id: string) => void;
};

export default function ProductCard({ product: p, onDelete }: TProductCard) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <Link href={`/product/${p._id}`}>
        <div className="w-full h-40 overflow-hidden cursor-pointer">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${p.image}`}
            alt={p.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between flex-1">
        <Link href={`/product/${p._id}`}>
          <div className="cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>

            <p className="text-sm text-blue-500">{p.category?.name}</p>

            <p className="text-gray-700 mt-1">Rs {p.price}</p>

            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {p.description}
            </p>
          </div>
        </Link>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/edit/${p._id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(p._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
