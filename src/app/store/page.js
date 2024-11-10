'use client'
import SectionHeaders from "@/components/layout/SectionHeaders"
import Item from "@/components/menu/Item"
import { useEffect, useState } from "react"

export default function StorePage(){
    const [categories, setCtegories] = useState([])
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCtegories(categories))
        });
        fetch('/api/items').then(res => {
            res.json().then(items => setItems(items));
        })
    },[])
    return(
        <section className="mt-8">
            {categories?.length > 0 && categories.map(c => (
                <div key={c._id}>
                    <div className="text-center">
                    <SectionHeaders mainHeader={c.name}/>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                    {items.filter(item => item.category === c._id).map(item => (
                        
                        <Item key={item._id} {...item}/>
                    ))}
                    </div>
                    
                    
                </div>
            ))}
        </section>
    )
}