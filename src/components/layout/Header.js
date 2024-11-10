"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CartContext } from "../AppContext";
import { useContext, useState } from "react";
import CartIcon from "../icons/Cart";
import Bars2 from "../icons/Bars2";
import Image from "next/image";

function AuthLinks({status, userName}){
  if(status === "authenticated"){
    return (
      <>
      <Link href={"/profile"} className="whitespace-nowrap">
        Hello, {userName}
      </Link>
      <button
        onClick={() => signOut()}
        className="bg-primary text-white rounded-full px-8 py-2"
      >
        Logout
      </button>
    </>
    )
  }
  if(status === "unauthenticated"){
    return(
      <>
      <Link href={"/login"}>Login</Link>
      <Link
        href={"/register"}
        className="bg-primary text-white rounded-full px-8 py-2"
      >
        Register
      </Link>
    </>
    )
  }
}

export default function Header() {
  const { data: session, status } = useSession();
  const userData = session?.user;
  let userName = userData ? userData.name || userData.email : "guest";
  const { cartProducts } = useContext(CartContext);
  const[mobileNavOpen, setMobileNavOpen] = useState(false)
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header>
        <div className="flex items-center md:hidden justify-between">
          <Link className="text-primary font-semibold text-2xl" href="/">
            <Image src={"/logo.png" || null} width={120} height={64} style={{objectFit:"cover"}} alt={"rice"} priority/>
          </Link>
          <div className="flex gap-8 items-center">
            <Link href={"/cart"} className="relative">
              <CartIcon />
              {cartProducts.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-primary text-white text-xs rounded-full leading-3 p-1">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            <button className="p-1" onClick={() => setMobileNavOpen(prev => !prev)}>
              <Bars2 />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div
          onClick={()=> setMobileNavOpen(false)} 
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center font-semibold text-gray-500">
          <Link href={"/"}>Home</Link>
              <Link href={"/store"}>Store</Link>
              <Link href={"/#about"}>About</Link>
              <Link href={"/#contact"}>Contact</Link>
              <AuthLinks status={status} userName={userName}/>
          </div>
        )}
        
        <div className="hidden md:flex items-center justify-between">
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link className="text-primary font-semibold text-2xl" href="/">
              EGAP
            </Link>

            <Link href={"/"}>Home</Link>
            <Link href={"/store"}>Store</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-4 text-gray-500 font-semibold">
            <AuthLinks status={status} userName={userName}/>
            <Link href={"/cart"} className="relative">
              <CartIcon />
              {cartProducts.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-primary text-white text-xs rounded-full leading-3 p-1">
                  {cartProducts.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
