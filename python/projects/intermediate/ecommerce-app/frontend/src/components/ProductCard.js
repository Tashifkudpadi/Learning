import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <Link href={`/products/${product.id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  );
}
