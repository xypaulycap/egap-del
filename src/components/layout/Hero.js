'use client'
import Image from "next/image";
import Right from "../icons/Right";
import "../../app/globals.css";
import Link from "next/link";
import HeroCarousel from "./HeroCarousel";


export default function Hero() {
  return (
    <section className="hero md:mt-4 relative flex md:flex-row items-center md:items-start">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br /> is better <br /> with
          <span className="text-primary"> Egap</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          We sell all you could ever require to make your homes better
        </p>
        <div className="flex gap-4 text-sm">
          <Link href={'/store'} className="bg-primary uppercase button flex items-center justify-center gap-1 text-white px-4 py-2 rounded-full">
            Order Now
            <Right />
          </Link>
          <button className="flex border-0 items-center gap-1 py-2 text-gray-600 font-semibold">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <HeroCarousel />
    </section>
  );
}
