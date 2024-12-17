'use client'
import Image from "next/image";
import Item from "../menu/Item";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import ItemForm from "./ItemForm";

export default function HomeMenu() {
  const[bestProducts, setBestProducts] = useState();
  useEffect(() =>{
    fetch('/api/items').then(res => {
      res.json().then(items => {
        setBestProducts(items.slice(-3))
        
      });
    });
  },[])
  return (
    <section>
      <SectionHeaders  mainHeader={'Our Latest Products'} className= 'mb-4' />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {bestProducts?.length > 0 && bestProducts.map((item,index) => (
          <Item key={item._id} {...item}/>
        ))}
      </div>
    </section>
  );
}
