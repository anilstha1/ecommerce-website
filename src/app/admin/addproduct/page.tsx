import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ProductForm from "@/components/productForm";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";

export default async function AddProduct() {
  const session: any = await getServerSession(authOptions);
  console.log(session);
  if (session?.user?.role !== "admin") redirect("/home");

  return <ProductForm />;
}
