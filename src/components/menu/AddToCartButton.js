import { useState } from "react";
import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {




  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent w-full mt-4" onClick={onClick}>
        <FlyingButton 
        targetTop={"5%"} 
        targetLeft={"95%"} 
        src={image}>
            <div >
            Add to cart ₦{basePrice}
            </div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (From ₦{basePrice})</span>
    </button>
  );
}

// import { useState } from "react";
// import FlyingButton from "react-flying-item";

// export default function AddToCartButton({
//   hasSizesOrExtras,
//   onClick,
//   basePrice,
//   image,
// }) {
//   const [showQuantityPopup, setShowQuantityPopup] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     setShowQuantityPopup(true); // Show the quantity popup
//   };

//   const handleConfirmQuantity = () => {
//     setShowQuantityPopup(false); // Hide the popup
//     onClick(quantity); // Pass the quantity to the onClick function
//   };

//   const handleCancel = () => {
//     setShowQuantityPopup(false)
//   }

//   return (
//     <>
//       {showQuantityPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-64">
//             <h3 className="text-lg font-semibold mb-4">Select Quantity</h3>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               className="border border-gray-300 rounded w-full p-2 mb-4"
//             />
//             <button
//               onClick={handleConfirmQuantity}
//               className="bg-primary text-white rounded-full px-4 py-2 w-full"
//             >
//               Confirm
//             </button>
//             <button onClick={handleCancel}
//                 className="bg-gray-300 text-gray-700 rounded-full px-4 py-2 flex-1 mt-1">
//               cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {!hasSizesOrExtras ? (
//         <div className="flying-button-parent w-full mt-4" onClick={handleAddToCart}>
//           <FlyingButton
//             targetTop={"5%"}
//             targetLeft={"95%"}
//             src={image}
//           >
//             <div >
//               Add to cart ${basePrice}
//             </div>
//           </FlyingButton>
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={handleAddToCart}
//           className="bg-primary text-white rounded-full px-8 py-2"
//         >
//           <span>Add to cart (From ${basePrice})</span>
//         </button>
//       )}
//     </>
//   );
// }
