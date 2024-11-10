import { useState } from "react"

export default function DeleteButton({label, onDelete}){
    const [showConfirmation, setShowConfirmation] = useState(false)

    if(showConfirmation) {
        return(
            <div className="fixed bg-black/80 flex items-center h-full inset-0 justify-center">
                <div className=" bg-white p-4 rounded-lg">
            <div>Are you sure you want to delete?</div>
            <div className="flex gap-2 mt-1">
                <button type="button" onClick={()=> setShowConfirmation(false)}>Cancel</button>
                <button
                onClick={() => {
                    onDelete(); 
                    setShowConfirmation(false)}} 
                type="button" className="primary">Yes,&nbsp;delete</button>
            </div>
            </div>
            </div>
            
        )
    }
    return(
        <button type="button" onClick={() => setShowConfirmation(true)}>{label}</button>
        
    )
}