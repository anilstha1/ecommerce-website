"use client";
import axios from "axios";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function ProductsPage() {
  const session: any = useSession();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  if (session.data?.user?.role !== "admin") {
    router.push("/home");
  }
  useEffect(() => {
    const res = axios.get("/api/products").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleDelete = async (id: any) => {
    const res = await axios.delete("/api/products", {data: {id}});
    console.log(res);
  };
  const handleEdit = async (id: string) => {
    router.push(`/admin/editProduct/${id}`);
  };
  return (
    <div className="min-w-screen bg-gray-300 p-3">
      <div className="container mx-auto bg-white rounded-md p-3">
        <h1 className="text-xl font-bold">Products</h1>
        <div>
          <div className="w-full text-left grid grid-cols-3 mt-3">
            <p>Product</p>
            <p>Price</p>
            <p>Actions</p>
          </div>

          {products.map((product: any) => {
            return (
              <div
                key={product._id}
                className="w-full grid grid-cols-3 items-center py-3 border-t"
              >
                <div>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={800}
                    height={400}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  {product.name}
                </div>
                <div className="flex items-center gap-1">{product.price}</div>
                <div>
                  <button
                    className="text-white bg-blue-600 rounded-md py-2 px-3"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-blue-600 rounded-md py-2 px-3 ml-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
