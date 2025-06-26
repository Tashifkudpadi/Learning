import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
      } catch (error) {
        toast.error("Failed to fetch user info");
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="p-4 border rounded">
          <p className="font-bold">Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          <Link
            href="/orders"
            className="mt-4 p-3 mx-3 bg-black text-white rounded"
          >
            Orders
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
