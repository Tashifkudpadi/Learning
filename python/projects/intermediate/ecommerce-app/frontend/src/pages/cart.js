import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(cartItems.filter((item) => item.id !== cartId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantities
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(
        cartItems.map((item) =>
          item.id === cartId ? { ...item, quantity: res.data.quantity } : item
        )
      );
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        { total_amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems([]);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4 p-4 border rounded"
              >
                <div>
                  <h2 className="text-lg font-bold">{item.product.name}</h2>
                  <p>Price: ${item.product.price}</p>
                  <div className="flex items-center">
                    <p>Quantity: </p>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="mx-2 p-1 bg-gray-300 text-black rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="mx-2 p-1 bg-gray-300 text-black rounded"
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <p className="text-xl font-bold mb-4">
              Cart Total: $
              {cartItems
                .reduce(
                  (sum, item) => sum + item.product.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
            <button
              onClick={handleOrder}
              className="p-2 bg-green-500 text-white rounded"
            >
              Submit Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
