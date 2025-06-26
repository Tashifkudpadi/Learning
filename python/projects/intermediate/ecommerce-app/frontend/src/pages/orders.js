import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded">
                <p className="font-bold">Order ID: {order.id}</p>
                <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
                <p>Status: {order.status}</p>
                <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
                <div className="mt-2">
                  <p className="font-semibold">Items:</p>
                  <ul className="list-disc pl-5">
                    {order.order_items.map((item) => (
                      <li key={item.id}>
                        {item.product.name} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
