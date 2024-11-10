import { useState } from "react";
import Add from "../icons/Add";
import ChevronDown from "../icons/ChevronDown";
import Delete from "../icons/Delete";
import ChevronUp from "../icons/ChevronUp";

export default function ItemPriceProps({ addLabel, name, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button onClick={() => setIsOpen(prev => !prev)} type="button" className="inline-flex p-1 border-0 justify-start">
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div key={index._id} className="flex gap-2 items-end">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(ev) => editProp(ev, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(ev) => editProp(ev, index, "price")}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeProp(index)}
                className="bg-white mb-2 px-2"
              >
                <Delete />
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={addProp} className="bg-white items-center">
        <Add className="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
      </div>
      
    </div>
  );
}
