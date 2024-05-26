"use client";
import {useSession} from "next-auth/react";
import {FaShoppingCart} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/shoppingslice";

export default function AddToCartBtn({product}: any) {
  const {data: session}: any = useSession();
  const dispatch = useDispatch();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(addToCart({...product, quantity: 1}));
  };

  return (
    <button
      className="text-white bg-blue-600 w-fit rounded-lg py-2 px-3 flex gap-1 items-center"
      onClick={handleClick}
    >
      <FaShoppingCart />
      Add to cart
    </button>
  );
}
