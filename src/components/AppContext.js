"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if(cartProduct.size) {
    price += cartProduct.size.price;
  }
  if(cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras){
      price += extra.price
    }
  }
  return price;
}

export function AppProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null

    useEffect(() => {
      if (ls && ls.getItem('cart')) {
        setCartProducts(JSON.parse(ls.getItem('cart')).map((product) => ({
          ...product,
          quantity: product.quantity || 1,
        })));
      }  
    },[ls]);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([])
    }

    function removeCartProduct(indexToRemove){
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((_,index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success('Item removed')
    }

    function saveCartProductsToLocalStorage(cartProducts){
        if(ls) {
          console.log("saving to local storage:", cartProducts);
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }
    
    function addToCart(product, size=null, extras=[], quantity = 1) {
      console.log("addToCart called with:", product, size, extras, quantity);
      
      setCartProducts(prevProducts => {
          const existingProductIndex = prevProducts.findIndex((cartProduct) => 
          cartProduct._id === product._id &&
        cartProduct.size?.name === size?.name &&
      JSON.stringify(cartProduct.extras) === JSON.stringify(extras)
    )
    // const cartProduct = {...product, size, extras, quantity }
    let newProducts;
    if(existingProductIndex >= 0){
      //if product exists update its quantity
     newProducts = [...prevProducts];
     newProducts[existingProductIndex] = {...newProducts[existingProductIndex], quantity: quantity}
    } else {
      //add the new product to the cart
      newProducts = [...prevProducts, {...product, size,extras,quantity}]
    }
    saveCartProductsToLocalStorage(newProducts);
    return newProducts;
      });

  //   function addToCart(product, size = null, extras = [], quantity = 1) {
  // setCartProducts((prevProducts) => {
  //   const existingProductIndex = prevProducts.findIndex(
  //     (cartProduct) =>
  //       cartProduct.id === product.id &&
  //       cartProduct.size?.name === size?.name &&
  //       JSON.stringify(cartProduct.extras) === JSON.stringify(extras)
  //   );

  //   if (existingProductIndex >= 0) {
  //     // If the product exists, update its quantity
  //     return updateProductQuantity(existingProductIndex, quantity, prevProducts);
  //   } else {
  //     // If the product does not exist, add it to the cart
  //     const cartProduct = { ...product, size, extras, quantity };
  //     const newProducts = [...prevProducts, cartProduct];
  //     saveCartProductsToLocalStorage(newProducts);
  //     return newProducts;
  //   }
  // });
}

// function updateProductQuantity(index, quantity, products) {
//   const updatedProducts = [...products];
//   const existingProduct = updatedProducts[index];
//   existingProduct.quantity = (existingProduct.quantity || 0);
//   saveCartProductsToLocalStorage(updatedProducts);
//   return updatedProducts;
// }
  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts, setCartProducts,
        addToCart, removeCartProduct, clearCart,
      }}>
        {children}
        </CartContext.Provider>
    </SessionProvider>
  );
}
