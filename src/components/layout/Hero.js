import Image from "next/image";
import Right from "../icons/Right";
import "../../app/globals.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
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

      <div className="relative hidden md:block">
        <Image src={"/rice.png" || null} width={350} height={350} style={{objectFit:"cover"}} alt={"rice"} priority />
      </div>
    </section>
  );
}
