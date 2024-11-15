import { useEffect, useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import ItemPriceProps from "./ItemPriceProps";

export default function ItemForm({ onSubmit, item }) {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [basePrice, setBasePrice] = useState(item?.basePrice || "");
  const [image, setImage] = useState(item?.image || "");
  const [sizes, setSizes] = useState(item?.sizes || []);
  const [extraPrices, setExtraPrices] = useState(item?.extraPrices || []);
  const [category, setCategory] = useState(item?.category || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
        if (!category && categories.length > 0) {
          setCategory(categories[0]._id); // Set the first category as default
        }
      });
    });
  }, []);

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraPrices,
          category,
        })
      }
    >
      <div
        className="md:grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories && categories.length > 0 ? (
              categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))
            ) : (
              'Loading categories...'
            )}
          </select>

          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <ItemPriceProps
            name={"Sizes"}
            props={sizes}
            setProps={setSizes}
            addLabel={"Add item size"}
          />
          <ItemPriceProps
            name={"Extras"}
            addLabel={"Extras prices"}
            props={extraPrices}
            setProps={setExtraPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
