"use client";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ItemsPage() {
    const {loading, data} = useProfile();
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('/api/items').then(res => {
            res.json().then(items => {
                setItems(items)
            })
        })
    }, [])

    if(loading) {
        return 'Info loading...'
    }

    if(!data.admin){
        return 'Not an admin'
    }
    return (
        <section className="mt-8 max-w-xl mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
            <Link
            className="button" 
            href={'/items/new'}>
                Create new item
                <Right />
                </Link>
            </div>

            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit items</h2>
                <div className="grid grid-cols-3 gap-2">
                {items?.length > 0 && items.map(item => (
                    <Link href={'/items/edit/'+ item._id} className="bg-gray-200 rounded-lg p-4" 
                    key={item._id}>
                        <div className="relative"> 
                        <Image
                        className="rounded-md" 
                        src={item.image} alt={''} width={200} height={200} />
                        </div>
                        <div className="text-center">
                        {item.name}
                        </div>
                    </Link>
                ))}
                </div>
                
            </div>
            
        </section>
      );
  }

  

  

