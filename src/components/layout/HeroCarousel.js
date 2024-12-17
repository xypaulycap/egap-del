'use client'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true, 
      autoplay: true,
      autoplayInterval: 1000, // Adjust the interval for autoplay
    },
    [Autoplay()]
  );

  return (
    <div className="embla flex-1 md:w-1/2" ref={emblaRef}>
        <div className='embla_container flex'>
        <div className="embla__slide flex justify-center items-center w-full">
            <Image 
              src="/rice.png" 
              width={250} 
              height={250} 
              style={{ objectFit: "cover" }} 
              alt="Rice" 
              priority 
            />
          </div>
          <div className="embla__slide flex justify-center items-center w-full">
            <Image 
              src="/oil.png" 
              width={250} 
              height={250} 
              style={{ objectFit: "cover" }} 
              alt="Oil" 
              priority 
            />
          </div>
          {/* Add more images if needed */}
        </div>
        </div>
  );
}
