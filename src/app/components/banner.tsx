import Image from "next/image";

export default function Banner({product}: any) {
  return (
    <div className="mt-5  bg-gray-100 rounded-lg flex flex-col lg:flex-row gap-5 ">
      <Image
        src={product?.images[0]}
        alt={product?.name}
        width={800}
        height={400}
        className="w-full h-[400px] object-cover rounded-lg"
      />
      <div className="w-full flex flex-col justify-center p-5">
        <h1 className="text-xl font-bold">{product?.name}</h1>
        <p>{product?.description}</p>
        <div>
          <button className="text-white bg-blue-600 border rounded-md mt-5 py-2 px-3">
            read more
          </button>
          <button className="ml-3 text-white bg-blue-600 border rounded-md mt-5 py-2 px-3">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
