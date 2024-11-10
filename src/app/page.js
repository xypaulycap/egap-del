import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className=" text-center mt-16" id="about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4  flex flex-col gap-4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
            atque ducimus, autem ratione, commodi quis voluptatum vero fugiat
            error modi itaque at mollitia aperiam ipsum! Quas rerum eligendi
            repellendus tenetur?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
            atque ducimus, autem ratione, commodi quis voluptatum vero fugiat
            error modi itaque at mollitia aperiam ipsum! Quas rerum eligendi
            repellendus tenetur?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus,
            atque ducimus, autem ratione, commodi quis voluptatum
          </p>
        </div>
      </section>
      <section className="mt-16 text-center" id="contact">
        <SectionHeaders
        subHeader={'Don\'t hesitate to contact'}
        mainHeader={'Contact Us'}
        />
        <div className="flex flex-col gap-2">
        <a className="text-3xl underline" href="tel:+2348109082300">+2348109082300</a>
        <h2>Email us: <a className="text-2xl" href="mailto:imafidon001@gmail.com">imafidon001@gmail.com</a></h2>
        </div>
      </section>
    </>
  );
}
