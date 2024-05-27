"use client";
import Image from "next/image";
import AddToCartBtn from "@/components/addToCartBtn";
import {Rating} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Link from "next/link";
import {FaCheckCircle} from "react-icons/fa";

export default function ProductDetails({product}: any) {
  const [imgUrl, setImgUrl] = useState(product.images[0]);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const {products} = useSelector((state: any) => state.shopping);

  useEffect(() => {
    products.forEach((cartProduct: Product) => {
      if (cartProduct._id === product._id) {
        setIsProductInCart(true);
        return;
      }
    });
  }, [products]);

  return (
    <div>
      <div className="container p-5 mx-auto mt-3 rounded-md grid grid-col-1 lg:grid-cols-2 gap-5 bg-gray-100">
        <div className="flex flex-col items-center">
          <Image
            src={imgUrl}
            alt={product.name}
            width={800}
            height={400}
            className="w-full h-[350px] object-cover rounded-lg shadow-lg"
          />
          <div className="w-fit mt-5 p-3 flex flex-row justify-center gap-3 border border-gray-200 rounded-md">
            {product?.images?.map((imageUrl: string) => {
              return (
                <>
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={800}
                    height={400}
                    className="w-24 h-24 object-cover rounded-lg hover:border hover:border-black cursor-pointer"
                    onClick={() => setImgUrl(imageUrl)}
                  />
                </>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex gap-3">
            <Rating value={product.rating} readOnly />
            <span> 0 reviews</span>
          </div>

          <p className="text-lg font-bold bg-gray-100 w-fit px-2 rounded-lg">
            Rs{product.price}
          </p>
          <p>{product.description}</p>
          {isProductInCart ? (
            <>
              <div>
                <div className="flex gap-2 items-center mb-2">
                  <FaCheckCircle className={"text-blue-600"} />
                  <span>Product added to the cart</span>
                </div>
                <Link
                  href="/cart"
                  className="text-white bg-blue-600 w-fit rounded-lg py-2 px-3 flex gap-1 items-center"
                >
                  View Cart
                </Link>
              </div>
            </>
          ) : (
            <AddToCartBtn product={product} />
          )}
        </div>
      </div>
    </div>
  );
}
