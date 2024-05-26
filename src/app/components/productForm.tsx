"use client";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Input} from "postcss";
import {useState} from "react";
import {serialize} from "v8";

export default function ProductForm({product}: any) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [price, setPrice] = useState(product?.price || 0);

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      if (!product) {
        const res = await axios.post("/api/products", {
          name,
          description,
          category,
          imageUrl,
          price,
        });
        console.log(res);
      } else {
        const res = await axios.put("/api/products", {
          _id: product._id,
          name,
          description,
          category,
          imageUrl,
          price,
        });
        console.log(res);
      }

      setName("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      setPrice(0);
    } catch (error: any) {
      console.log("Signup Failed", error);
    }
  }
  return (
    <div className="w-full">
      <div className="container mx-auto w-full flex flex-col rounded-md mt-8 p-5 ">
        <h1 className="text-xl text-center font-bold">
          {product ? "Edit Product" : "New Product"}
        </h1>
        <hr />
        <div className="flex flex-col gap-5 pt-5">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="w-full text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="description"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category">category</label>
            <input
              className="w-full text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="category"
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              placeholder="category"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="imageUrl">ImageUrl</label>
            <input
              className="w-full text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
              placeholder="imageUrl"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              className="w-full text-black p-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:border-gray-600"
              id="price"
              type="number"
              min="0"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              placeholder="price"
            />
          </div>

          <button
            className="text-white p-2 mx-3 mb-3 border border-grey-300 rounded-lg bg-blue-600 hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
