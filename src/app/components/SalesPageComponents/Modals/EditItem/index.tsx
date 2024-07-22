import { UPDATE_ITEM } from "@/app/libs/auth/api/graphql/mutations";
import { GET_ME } from "@/app/libs/auth/api/graphql/queries";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { useState, useContext, forwardRef } from "react";
import { Notification } from "@/app/providers/Notification";
import ownerContext from "@/app/providers/Owner";

interface formState {
  name: string;
  price: string | number;
  quantity: string | number;
  description: string;
  sale: string | null;
}

interface IEditItemModal {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
  };
}

const EditItemModal = forwardRef<HTMLDivElement, IEditItemModal>(function EditItemModal({ setIsOpen, item }, ref) {
  const { sale } = useContext(ownerContext);
  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [formState, setFormState] = useState<formState>({
    sale,
    name: item.name,
    price: item.price,
    description: item.description,
    quantity: item.quantity,
  });

  const { setNotification } = useContext(Notification);

  const handleUpdateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    if (!formState.name || !formState.price || !formState.quantity) {
      setNotification({
        message: "Please fill out at least one field",
        type: "error",
      });
      return;
    }
    try {
      const { data } = await updateItem({
        variables: {
          ...formState,
          _id: item._id,
        },
      });

      if (data.errors) {
        throw new Error("Error updating item");
      } else {
        setNotification({
          message: "Item updated successfully",
          type: "success",
        });
        setFormState({ sale: null, name: "", price: "", description: "", quantity: "" });
        document.body.style.overflow = "auto";
        setIsOpen(false);
      }
    } catch (error) {
      setNotification({
        message: "Error updating item",
        type: "error",
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.0, type: "tween" }} className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div initial={{ y: "100vh" }} animate={{ y: 0 }} exit={{ y: "90vh" }} transition={{ duration: 0.8, delay: 0.2, type: "tween" }} className="relative z-50 flex flex-col items-center justify-center gap-4 rounded-lg border border-teal-500 bg-slate-800 bg-opacity-55 p-6 backdrop-blur-md" ref={ref}>
        <div className="absolute right-0 top-0 p-2">
          <button
            onClick={() => {
              setIsOpen(false);
              setTimeout(() => {
                document.body.style.overflow = "auto";
              }, 1100);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 p-2 text-center text-white transition duration-500 hover:scale-105 hover:bg-red-700"
          >
            X
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-4xl text-yellow-300">Update Item</h2>
          <form className="flex flex-col gap-2" onSubmit={handleUpdateItem}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input type="text" id="name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="rounded-lg border border-teal-500 bg-slate-600 p-2 text-white transition duration-500 focus:border-white focus:bg-slate-400 focus:outline-none" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-white">
                Price
              </label>
              <input type="number" id="price" value={formState.price} onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) })} className="rounded-lg border border-teal-500 bg-slate-600 p-2 text-white transition duration-500 focus:border-white focus:bg-slate-400 focus:outline-none" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-white">
                Quantity
              </label>
              <input type="number" id="quantity" value={formState.quantity} onChange={(e) => setFormState({ ...formState, quantity: parseInt(e.target.value) })} className="rounded-lg border border-teal-500 bg-slate-600 p-2 text-white transition duration-500 focus:border-white focus:bg-slate-400 focus:outline-none" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-white">
                Description
              </label>
              <textarea id="description" value={formState.description} onChange={(e) => setFormState({ ...formState, description: e.target.value })} className="rounded-lg border border-teal-500 bg-slate-600 p-2 text-white transition duration-500 focus:border-white focus:bg-slate-400 focus:outline-none" />
            </div>
            <button type="submit" className="rounded-lg border border-teal-500 bg-blue-500 p-2 text-yellow-300 transition duration-500 hover:scale-105 hover:bg-blue-700 hover:text-white">
              Update Item
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default EditItemModal;
