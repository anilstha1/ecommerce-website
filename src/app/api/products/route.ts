import {connect} from "@/app/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import Product from "@/app/models/productModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {name, description, category, imageUrl, price}: any = data;
    console.log(data);
    const newProduct = new Product({
      name,
      description,
      category,
      images: imageUrl,
      price,
    });
    const savedProduct = await newProduct.save();
    console.log(savedProduct);

    return NextResponse.json(
      {
        message: "Product added Successfull",
        savedProduct,
      },
      {status: 200}
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      {status: 500}
    );
  }
}

export async function GET() {
  try {
    const products = await Product.find({});
    return NextResponse.json({products}, {status: 200});
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

export async function PUT(request: NextRequest) {
  try {
    const product = await request.json();
    console.log(product);
    const updadtedProduct = await Product.findOneAndReplace(
      {_id: product._id},
      product
    );
    return NextResponse.json(
      {message: "Product updated successfully", updadtedProduct},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const {id} = await request.json();
    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      {message: "Product deleted successfully"},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
