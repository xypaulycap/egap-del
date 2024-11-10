import Image from "next/image";
import Delete from "../icons/Delete";
import { cartProductPrice } from "../AppContext";

export default function CartProduct ({product,onRemove}){
  console.log("Rendering CartProduct:", product);
    return(
        <div
                className="flex gap-4 items-center border-b py-2"
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div>
                    {product.size && (
                      <div className="text-sm text-gray-900">
                        Size: <span>{product.size.name}</span>
                      </div>
                    )}
                    {product.extras?.length > 0 && (
                      <div className="text-sm text-gray-500">
                        {product.extras.map((extra) => (
                          <div key={extra._id}>
                            {extra.name} ${extra.price}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-lg font-semibold">
                ₦{cartProductPrice(product)}
                </div>
                <div>Q{product.quantity}</div>
                {!!onRemove && (
                    <div >
                    <button
                    type="button"
                    onClick={onRemove} 
                    className="p-2">
                      <Delete/>
                      </button>
                </div>
                )}
                
              </div>
    )
}