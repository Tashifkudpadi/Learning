import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-white text-xl font-bold">
          E-Shop
        </Link>
        <div>
          <Link href="/dashboard" className="text-white mr-4">
            Products
          </Link>
          <Link href="/cart" className="text-white mr-4">
            Cart
          </Link>

          <Link href="/profile" className="text-white mr-4">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
