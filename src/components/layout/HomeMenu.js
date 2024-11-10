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
      <SectionHeaders subHeader={'Check Out'} mainHeader={'Our Best Products'} />
      <div className="grid sm:grid-cols-3 gap-4">
        {bestProducts?.length > 0 && bestProducts.map(item => (
          <Item key={item._id} {...item}/>
        ))}
      </div>
    </section>
  );
}
