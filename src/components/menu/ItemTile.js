import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import AddToCartButton from "./AddToCartButton";

export default function ItemTile({onAddToCart, ...item}){
    const { image, name, description, basePrice, sizes, extraPrices, quantity, } = item;

    const hasSizesOrExtras = sizes?.length > 0 || extraPrices?.length > 0;

   
    return(
        <div className=" flex flex-col items-center bg-gray-100 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25 cursor-pointer">
        <div className="text-center">
          <Image
            src={image}
            className="block mx-auto"
            width={60}
            height={50}
            alt="product image"
          />
        </div>

        <h4 className="font-semibold my-2 text-xl">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
        <AddToCartButton
        image={image} 
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
        />
      </div>
    )
}