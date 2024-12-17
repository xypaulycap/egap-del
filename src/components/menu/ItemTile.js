import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default function ItemTile({onAddToCart, ...item}){
    const { image, name, description, basePrice, sizes, extraPrices, quantity } = item;

    const hasSizesOrExtras = sizes?.length > 0 || extraPrices?.length > 0;

    // Limit description to 10 words
    const truncatedDescription = description.split(" ").slice(0, 10).join(" ") + (description.split(" ").length > 10 ? "..." : "");

    return(
      <>
        <div className="flex flex-col items-center bg-gray-100 p-1 rounded-md text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25 cursor-pointer w-40">
  <Link href={'/item/'+ item._id}>
    <div className="text-center">
      <Image
        src={image}
        className="block mx-auto mt-2"
        width={40}  // Even smaller image size
        height={30}
        alt="product image"
      />
    </div>

    <h4 className="font-semibold my-1 text-lg">{name}</h4>  {/* Smaller font size */}
    <p className="text-gray-500 text-sm line-clamp-2 mt-2">{truncatedDescription}</p>
  </Link>
  
  <div className="mt-auto w-full m-1">
    <AddToCartButton
      image={image} 
      hasSizesOrExtras={hasSizesOrExtras}
      onClick={onAddToCart}
      basePrice={basePrice}
    />
  </div>
</div>

      </>
    )
}
