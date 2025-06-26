import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
