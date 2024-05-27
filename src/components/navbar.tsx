"use client";
import Link from "next/link";
import {FiLogIn} from "react-icons/fi";
import {FaShoppingCart} from "react-icons/fa";
import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Navbar() {
  const {data}: any = useSession();
  const {products} = useSelector((state: any) => state.shopping);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      searchProduct();
    }
  };
  const searchProduct = () => {
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-3">
      <div className="flex items-center">
        <Link
          href="/home"
          className="text-xl text-white font-bold rounded-md mx-auto px-3 py-2"
        >
          SHOPIFY
        </Link>

        {!(data?.user?.role === "admin") ? (
          <div className="flex gap-5 mx-auto">
            <Link
              href="/home"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              All Products
            </Link>
          </div>
        ) : (
          <div className="flex gap-5 mx-auto">
            <Link
              href="/home"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/admin/products"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/admin/addproduct"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Add Product
            </Link>
          </div>
        )}

        <div className="mx-auto flex flex-row relative">
          <div className="relative mt-4 md:mt-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="ml-3 flex flex-row">
            {data?.user?.role !== "admin" && (
              <Link
                href="/cart"
                className="flex items-center gap-1 bg-blue-600 text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-400 hover:text-white"
              >
                <FaShoppingCart />
                Cart({products?.length})
              </Link>
            )}

            {!data ? (
              <Link
                href="/login"
                className="flex items-center gap-1 ml-3 bg-blue-600 text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-400 hover:text-white"
              >
                <FiLogIn />
                Login
              </Link>
            ) : (
              <button
                className="ml-3 bg-blue-600 text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-400 hover:text-white"
                onClick={() => signOut()}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
