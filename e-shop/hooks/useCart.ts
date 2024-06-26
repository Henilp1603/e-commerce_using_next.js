import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";


interface CartStore{
    items:Product[],
    addItem:(data:Product)=>void,
    removeItem:(id:string)=>void,
    removeAll:()=>void
}

const useCart =create(
    persist<CartStore>((set,get)=>({
        items:[],
        addItem:(data:Product)=>{
            const currentItem=get().items

            const existingItem=currentItem.find((item)=>item.id === data.id)

            if (existingItem) {
                return toast.success("Item already in cart.")
            }

            set({items: [...get().items,data]})
            toast.success("Item added to cart.")
        },
        removeItem:(id:string)=>{
            set({items:[...get().items.filter((item)=>item.id !== id)]})
            toast.success("Item remove from the cart.")
        },
        removeAll:()=> set({items:[]}),

    }),{
        name:"cart-storage",
        storage:createJSONStorage(()=>localStorage)
    })
)

export default useCart