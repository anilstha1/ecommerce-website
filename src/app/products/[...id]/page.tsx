import Product from "@/app/models/productModel";
import Image from "next/image";
import AddToCartBtn from "@/app/components/addToCartBtn";
import {connect} from "@/app/dbConfig/dbConfig";
import ProductDetails from "@/app/components/productDetails";
import CommentCard from "@/app/components/commentCard";

interface productPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    connect();
    const product = await Product.findOne({_id: id});
    console.log(product);
    return product;
  } catch (error: any) {
    throw new Error("failed to fetch data");
  }
}
export default async function ProductPage({params: {id}}: productPageProps) {
  const product: Product = await getProduct(id);

  return (
    <div className="">
      <ProductDetails product={product} />
      <CommentCard />
    </div>
  );
}
