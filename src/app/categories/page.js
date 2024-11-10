"use client";
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }
  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editingCategory) {
        data._id = editingCategory._id;
      }
      //to send the input from the form on submission
      const response = await fetch("/api/categories", {
        method: editingCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditingCategory(null);
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editingCategory
        ? "Updating category..."
        : "Creating new category",
      success: editingCategory
        ? "Category updated"
        : "Category created successfully",
      error: "Error try again",
    });
  }

  async function handleCategoryDelete(_id){
    const deletePromise = new Promise(async(resolve, reject) => {
      const response = await fetch('/api/categories?_id='+_id, {
        method:'DELETE'
      });
      if(response.ok)
        resolve()
      else
      reject()
    });

    await toast.promise(deletePromise, {
      loading: 'Deleting...',
      success:'Deleted successfully',
      error:'Error'
    });

    fetchCategories();
    
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editingCategory ? "Update category" : "Create new category"}
              {editingCategory && (
                <>
                  : <b>{editingCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit" className="border border-primary">
              {editingCategory ? "Update" : "Create"}
            </button>
            <button type="button" onClick={()=> {setEditingCategory(null);
              setCategoryName('')
            }}>Cancel</button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 &&
          categories.map((c, key) => (
            <div
              key={c._id}
              className=" bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
            >
              <div className="grow">
                {c.name}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingCategory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <DeleteButton label="Delete" onDelete={() => handleCategoryDelete(c._id)}/>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
