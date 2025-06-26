import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
          );
          setProduct(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        { product_id: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="p-2 bg-blue-600 text-white rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
