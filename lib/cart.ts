"use server";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {connect} from "@/app/dbConfig/dbConfig";
import Cart from "@/app/models/cartModel";
import {getServerSession} from "next-auth";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function addCart(products: any) {
  const session: any = getServerSession(authOptions);
  console.log(session);

  try {
    connect();
    var newCart;
    if (session) {
      const cart = await Cart.findOne({userId: session.user.id});
      if (cart) {
        cart.products.push(products);
        const savedCart = cart.save();
        return savedCart;
      } else {
        newCart = new Cart({
          userId: session.user.id,
          products,
        });

        const savedCart = await newCart.save();
        console.log(savedCart);
        return savedCart;
      }
    } else {
      const cartId = cookies().get("cartId");
      if (!cartId) {
        newCart = new Cart({
          products,
        });
      } else {
        newCart = await Cart.findById(cartId);
        newCart.products.push(products);
      }
      const savedCart = await newCart.save();
      cookies().set("cartId", savedCart._id);
      console.log(savedCart);
      return savedCart;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("failed to open database");
  }
}

export async function getCart() {
  const session: any = await getServerSession(authOptions);
  try {
    connect();

    if (session) {
      const products = await Cart.find({userId: session.user.id});
      console.log(products);
      revalidatePath("/products/[...id]");
      return products;
    }
    const cartId = cookies().get("cartId");
    if (cartId) {
      const products = await Cart.findById(cartId);
      console.log(products);
      return products;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error("error in opening database");
  }
}
