"use client";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {decreaseQuantity, increaseQuantity} from "../redux/shoppingslice";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function CartPage() {
  const session = useSession();
  const {products} = useSelector((state: any) => state.shopping);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  useEffect(() => {
    var price = 0;
    products.map((product: any) => {
      price += product.quantity * product.price;
    });
    setTotalPrice(price);
  }, [products]);

  const handleCheckout = () => {
    if (!session.data) {
      router.push("/login");
    } else {
      console.log("payment successfull");
    }
  };
  return (
    <div className="min-w-screen bg-gray-300 p-5">
      <div className="w-full lg:w-2/3 bg-white mx-auto p-3 rounded-md">
        <h1 className="font-bold text-lg">Shopping Cart</h1>

        <div className="border-b border-gray-600">
          <div className="w-full text-left grid grid-cols-3">
            <p>Product</p>
            <p>Quantity</p>
            <p>Price</p>
          </div>

          {products.map((product: any) => {
            return (
              <div
                key={product._id}
                className="w-full grid grid-cols-3 items-center py-3 border-t "
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
                <div className="flex items-center gap-1">
                  <button
                    className="border"
                    onClick={() => {
                      dispatch(decreaseQuantity(product));
                    }}
                  >
                    <AiOutlineLeft />
                  </button>
                  {product.quantity}
                  <button
                    className="border"
                    onClick={() => {
                      dispatch(increaseQuantity(product));
                    }}
                  >
                    <AiOutlineRight />
                  </button>
                </div>
                <div>Rs{product.price * product.quantity}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <h2 className="font-bold">Order Summary</h2>
          <hr />
          <div className="flex mt-3">
            Total:<p className="w-1/3 ml-auto">Rs{totalPrice}</p>
          </div>
          <button
            className="text-white bg-blue-600 mt-3 py-2 px-5 rounded-lg hover:bg-blue-400"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
