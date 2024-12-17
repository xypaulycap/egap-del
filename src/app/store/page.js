'use client'
import SectionHeaders from "@/components/layout/SectionHeaders"
import Item from "@/components/menu/Item"
import { useEffect, useState } from "react"

export default function StorePage() {
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')  // State to track selected category

    // Fetch categories and items on component mount
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        });
        fetch('/api/items').then(res => {
            res.json().then(items => setItems(items));
        })
    }, [])

    // Handle category selection
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    // Function to group items by their category
    const groupItemsByCategory = (items) => {
        return items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
    }

    // Group items only when "All" is selected
    const groupedItems = selectedCategory === 'all' ? groupItemsByCategory(items) : {};

    return (
        <section className="mt-8">
            {/* Category Dropdown */}
            <div className="text-center mb-6 flex justify-center items-center flex-col">
                <label htmlFor="category" className="mr-4 text-lg text-primary text-nowrap">Select Category</label>
                <select 
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border p-2 rounded-md max-w-xs"
                >
                    <option value="all">All</option>
                    {categories?.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Render categories and items */}
            {categories?.length > 0 && categories.map(c => (
                // Render this category only if it's selected, or if "all" is selected
                (selectedCategory === 'all' || selectedCategory === c._id) && (
                    <div key={c._id}>
                        {/* Only render the category header if 'all' is selected, or the category matches */}
                        {(selectedCategory === 'all' || selectedCategory === c._id) && (
                            <div className="text-center">
                                <SectionHeaders mainHeader={c.name} />
                            </div>
                        )}

                        {/* Show the items in the current category (filtered for 'all' or specific category) */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6 mb-12">
                            {selectedCategory === 'all' 
                                ? // Show all items under their respective categories when 'All' is selected
                                  groupedItems[c._id]?.map(item => (
                                      <Item key={item._id} {...item} />
                                  ))
                                : // When a specific category is selected, just show the items of that category
                                  items.filter(item => item.category === c._id).map(item => (
                                      <Item key={item._id} {...item} />
                                  ))
                            }
                        </div>
                    </div>
                )
            ))}
        </section>
    )
}
