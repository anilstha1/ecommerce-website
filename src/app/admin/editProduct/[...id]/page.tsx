import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ProductForm from "@/components/productForm";
import {connect} from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";

interface editPageProps {
  params: {
    id: string;
  };
}

const getProduct = async (id: string) => {
  connect();
  const product = await Product.findById(id);
  console.log(product);
  return product;
};

export default async function EditPage({params: {id}}: editPageProps) {
  const session: any = await getServerSession(authOptions);
  const product = await getProduct(id);
  console.log(session);
  if (session?.user?.role !== "admin") redirect("/home");

  return <ProductForm product={product} />;
}
