import ProductCard from "@/components/productCard";
import Product from "@/models/productModel";
import Image from "next/image";
import {connect} from "../../dbConfig/dbConfig";
import Banner from "../../components/banner";

async function getProducts() {
  try {
    connect();
    const products = await Product.find().limit(10);
    console.log(products);
    return products;
  } catch (error: any) {
    throw new Error("failed to fetch data");
  }
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <div className="container mx-auto">
      <Banner product={products[0]} />
      <div className="flex flex-col mt-8">
        <h1 className="text-2xl font-bold">Latest Products</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product: Product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
