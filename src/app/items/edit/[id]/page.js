'use client'
import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import ItemForm from "@/components/layout/ItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditItemPage(){
    
    const { loading, data } = useProfile();
    const {id} = useParams()
    const [item, setItem] = useState(null)


    useEffect(() => {
        
        fetch('/api/items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setItem(item)
            })
        })
    }, [])

    
    if(loading){
        return 'Loading item info...'
    }

    if(!data.admin){
        return 'Not an admin.'
    }

    async function handleDetele(){
      const deletePromise = new Promise(async(resolve, reject) => {
        const response = await fetch('/api/items?_id='+id, {
          method: 'DELETE'
        })
        if(response.ok)
          resolve()
        else
        reject()
      })
      
      await toast.promise(deletePromise, {
        loading: 'Deleting item...',
        success: 'Deleted',
        error: 'Error'
    })

    redirect('/items')
      
    }
  
    async function handleFormSubmit(ev, data) {
      ev.preventDefault();
      data = {...data, _id:id};
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/items", {
          method: "PUT",
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
      <div className="max-w-xl mx-auto mt-8">
        <Link href={'/items'} className="button">
        <Left />
        <span>See all items</span>
        </Link>
      </div>
      <ItemForm item={item} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className=" max-w-xs ml-auto pl-4">
          <DeleteButton label="Delete this item" onDelete={handleDetele}/>
        </div>
      </div>
    </section>
    )
}