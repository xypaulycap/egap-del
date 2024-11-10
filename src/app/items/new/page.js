'use client'
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import ItemForm from "@/components/layout/ItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewItemPage(){
    
    const { loading, data } = useProfile();

    
    
    if(loading){
        return 'Loading user info...'
    }

    if(!data.admin){
        return 'Not an admin.'
    }
  
    async function handleFormSubmit(ev, data) {
      ev.preventDefault();
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/items", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) resolve();
        else reject();
      });
  
      await toast.promise(savingPromise, {
          loading: 'Saving item',
          success: 'Saved',
          error: 'Error'
      })

      redirect('/items')
    
    }

    return(
        <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={'/items'} className="button">
        <Left />
        <span>See all items</span>
        </Link>
      </div>
      <ItemForm item={null} onSubmit={handleFormSubmit}/>
    </section>
    )
    
}