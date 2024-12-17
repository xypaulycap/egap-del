
'use client';

import Image from 'next/image';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import FlyingButton from 'react-flying-item';
import { CartContext } from '@/components/AppContext';

export default function Product() {
  const { id } = useParams();
  const { addToCart, cartProducts } = useContext(CartContext);

  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [quantityPopup, setQuantityPopup] = useState(false);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((items) => {
        const selectedItem = items.find((i) => i._id === id);
        setItem(selectedItem);
        setSelectedSize(selectedItem?.sizes?.[0] || null);
      });
  }, [id]);

  useEffect(() => {
    if (item) {
      const existingProduct = cartProducts.find(
        (product) =>
          product._id === item._id &&
          product.size?.name === selectedSize?.name &&
          JSON.stringify(product.extras) === JSON.stringify(selectedExtras)
      );
      setQuantity(existingProduct ? existingProduct.quantity : 1);
    }
  }, [cartProducts, item, selectedSize, selectedExtras]);

  function handleAddToCartButtonClick() {
    const hasOptions =
      item?.sizes?.length > 0 || item?.extraPrices?.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    setQuantityPopup(true);
  }

  function handleQuantityConfirm() {
    addToCart(item, selectedSize, selectedExtras, quantity);
    setTimeout(() => {
      setQuantityPopup(false);
      setShowPopup(false);
    }, 1000);
    toast.success('Added to cart', { position: 'top-right' });
  }

  function handleExtraClick(ev, extra) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) =>
        prev.filter((e) => e._id !== extra._id)
      );
    }
  }

  if (!item) return <div>Loading...</div>;

  let selectedPrice = item.basePrice;
  if (selectedSize) selectedPrice += selectedSize.price;
  if (selectedExtras?.length > 0) {
    selectedExtras.forEach((extra) => {
      selectedPrice += extra.price;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Product Image */}
        <div className="flex-shrink-0 flex justify-center sm:block">
          <Image
            src={item.image || '/placeholder-image.jpg'}
            alt={item.name || 'Product Image'}
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full sm:w-auto max-w-[300px] sm:max-w-[400px]"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col space-y-4 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            {item.name || 'Product Name'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg">
            {item.description || 'No description available.'}
          </p>
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            ₦{selectedPrice}
          </div>

          {/* Add to Cart Button */}
          {/* <FlyingButton targetLeft={'95%'} targetTop={'5%'} src={item.image}>
            <div
              onClick={handleAddToCartButtonClick}
              className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition w-full sm:w-auto"
            >
              Add to Cart ₦{selectedPrice}
            </div>
          </FlyingButton> */}
          <div className='bg-primary rounded-lg' onClick={handleAddToCartButtonClick}>
          <FlyingButton
                        targetLeft={'95%'} 
                        targetTop={'5%'}
                        src={item.image}>
                          <div 
                          className="text-white sticky bottom-2">
                            Add to cart ₦{selectedPrice}
                          </div>
                        </FlyingButton>
                        </div>
        </div>
      </div>

      {/* Options Popup */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-4 rounded-lg max-w-md w-full"
          >
            <h3 className="text-center font-bold mb-4">Select Options</h3>

            {/* Sizes */}
            {item.sizes?.length > 0 && (
              <div className="py-2">
                <h4 className="text-gray-700 mb-2">Choose Size</h4>
                {item.sizes.map((size) => (
                  <label
                    key={size._id}
                    className="flex items-center gap-2 p-2 border rounded-md mb-1"
                  >
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize?.name === size.name}
                      onChange={() => setSelectedSize(size)}
                    />
                    {size.name} +₦{size.price}
                  </label>
                ))}
              </div>
            )}

            {/* Extras */}
            {item.extraPrices?.length > 0 && (
              <div className="py-2">
                <h4 className="text-gray-700 mb-2">Add Extras</h4>
                {item.extraPrices.map((extra) => (
                  <label
                    key={extra._id}
                    className="flex items-center gap-2 p-2 border rounded-md mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExtras
                        .map((e) => e._id)
                        .includes(extra._id)}
                      onChange={(ev) => handleExtraClick(ev, extra)}
                    />
                    {extra.name} +₦{extra.price}
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={() => setQuantityPopup(true)}
              className="bg-primary text-white rounded-lg px-4 py-2 w-full mt-4"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Quantity Popup */}
      {quantityPopup && (
        <div
          onClick={() => setQuantityPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-4 rounded-lg max-w-sm w-full"
          >
            <h3 className="text-center font-bold mb-4">Select Quantity</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
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
    </div>
  );
}

