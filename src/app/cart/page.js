"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Delete from "@/components/icons/Delete";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

  useEffect(() => {
    if(typeof window !== 'undefined'){
      if(window.location.href.includes('canceled=1')){
        toast.error('Payment failed 😞')
      }
    }
  },[])
 
  useEffect(() => {
    if(profileData?.city) {
      const {phone, streetAddress, city, country, postalCode} = profileData
      const addressFromProfile = {
        phone, 
        streetAddress, 
        city, 
        country, 
        postalCode};
      setAddress(addressFromProfile);
    }
  },[profileData])
  
  let subtotal = 0;
  for (const p of cartProducts) {
    
    subtotal += cartProductPrice(p) * p.quantity;
  }

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => {
      return {...prevAddress, [propName]:value}
    })
  }

  async function proceedToPayment(ev) {
    ev.preventDefault();
    //grabbing address and shoping cart products

    const promise = new Promise((resolve, reject) =>{
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async(response) => {
        if(response.ok) {
          resolve()
          const link = await response.json();
      // redirect to stripe
      window.location = link;
        } else {
          reject();
        }
        
      })
    }) 

    await toast.promise(promise, {
      loading:'Preparing your order',
      success: 'Redirecting to payment',
      error: 'Something went wrong....please try again later'
    })
  }

  if(cartProducts?.length === 0) {
    return(
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader={"Cart"} />
        <p className="mt-4">Shopping cart is empty 😓 check out our <Link href="/store"><span className="text-blue-800 underline"> store </span></Link> to purchase!🤗</p>
      </section>
    )
  }
  
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className=" mt-8 grid gap-8 md:grid-cols-2">
        <div>
          {cartProducts?.length == 0 && <div>No products in shopping cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct key={index} product={product} onRemove={() =>removeCartProduct(index)}/>
            ))}
            <div className="py-2 flex justify-end items-center pr-16">
              <span className="text-gray-600">
              Subtotal: <br />
              Delivery: <br />
              Total:
              </span>
              <div className="font-semibold pl-1 text-right">₦{subtotal} <br />
              ₦5 <br />
              ₦{subtotal + 5}
              </div>
            </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
            <h2>Checkout</h2>
            <h2 className="text-center">Online payment coming soon!! Please pay manually for now</h2>
            <form onSubmit={proceedToPayment}>
              <AddressInputs
              disabled
          addressProps={address}
          setAddressProps={handleAddressChange}
        />
              <button disabled type="submit">Pay ₦{subtotal + 5}</button>
            </form>
            <div className="mt-2">
              <Link href={'/manual-checkout'}>
            <button type="button" className="bg-white">Proceed to pay manually!</button>
            </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
