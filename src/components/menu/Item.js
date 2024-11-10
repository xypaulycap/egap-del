'use client'
import Image from "next/image";
import { CartContext } from "../AppContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ItemTile from "./ItemTile";
import FlyingButton from "react-flying-item";

export default function Item(item) {
  const { image, name, description, basePrice, sizes, extraPrices } = item;

  const { cartProducts, addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityPopup, setQuantityPopup] = useState(false);

  useEffect(() => {
    const existingProduct = cartProducts.find((product) =>
      product._id === item._id &&
      product.size?.name === selectedSize?.name &&
      JSON.stringify(product.extras) === JSON.stringify(selectedExtras)
    );
    if (existingProduct) {
      setQuantity(existingProduct.quantity);  // Load the existing quantity
    } else{
      setQuantity(1)
    }
  }, [cartProducts, item._id, selectedSize, selectedExtras]);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    } 
    setQuantityPopup(true);
  }

  function handleQuantityConfirm() {
    console.log(quantity);
    addToCart(item, selectedSize, selectedExtras, quantity);
    setTimeout(() => {
      setQuantityPopup(false);
      setShowPopup(false);
    }, 1000);
    toast.success("Added to cart", {
      position: "top-right",
    });
  }
  

  function handleExtraClick(ev, extra) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md "
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg text-center font-bold mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">
                    Pick sub category
                  </h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 p-2 border rounded-md mb-1"
                    >
                      <input
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name="size"
                      />
                      {size.name} ₦{basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">
                    Complement your choice
                  </h3>
                  {extraPrices.map((extra) => (
                    <label
                      key={extra._id}
                      className="flex items-center gap-2 p-2 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        name={extra.name}
                        checked={selectedExtras.map(e => e._id).includes(extra._id)}
                        onChange={(ev) => handleExtraClick(ev, extra)}
                      />
                      {extra.name} +₦{extra.price}
                    </label>
                  ))}
                </div>
              )}
              <FlyingButton
              targetLeft={'95%'} 
              targetTop={'5%'}
              src={image}>
                <div onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2">
                  Add to cart ₦{selectedPrice}
                </div>
              </FlyingButton>
              <button className="mt-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{quantityPopup && (
        <div
          onClick={() => setQuantityPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-4 rounded-lg max-w-sm"
          >
            <h3 className="text-center text-lg font-bold mb-4">
              Select Quantity
            </h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full border rounded-md p-2 text-center"
              min="1"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setQuantityPopup(false)}
                className="border border-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleQuantityConfirm}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <ItemTile onAddToCart={handleAddToCartButtonClick} {...item} />
    </>
  );
}
