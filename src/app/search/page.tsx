import ProductCard from "../../components/productCard";
import {connect} from "../../dbConfig/dbConfig";
import Product from "../../models/productModel";

interface SearchParams {
  searchParams: {query: string};
}

async function getProducts(query: String) {
  try {
    connect();
    const products = await Product.find({
      name: {$regex: query, $options: "i"},
    });
    return products;
  } catch (error: any) {
    throw new Error("failed to fetch data");
  }
}
export default async function SearchPage({
  searchParams: {query},
}: SearchParams) {
  const products = await getProducts(query);
  return (
    <div>
      {products.length ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((product: Product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      ) : (
        <div className="text-center">No Products found</div>
      )}
    </div>
  );
}
