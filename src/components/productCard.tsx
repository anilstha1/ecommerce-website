"use client";
import {Rating} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
export default function ProductCard({product}: any) {
  return (
    <>
      <Link
        href={`/products/${product._id}`}
        className="border bg-gray-100 rounded-lg m-3 p-5 w-full flex flex-col  gap-3"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={800}
          height={400}
          className="h-80 object-cover rounded-lg"
        />
        <h1 className="text-lg font-medium">{product?.name}</h1>
        <div className="">
          <Rating value={product?.rating} readOnly />
          <div> 0 reviews</div>
        </div>

        <p className="font-semibold">Rs.{product.price}</p>
      </Link>
    </>
  );
}
