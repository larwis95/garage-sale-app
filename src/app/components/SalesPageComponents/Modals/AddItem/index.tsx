import { ADD_ITEM } from "@/app/libs/auth/api/graphql/mutations";
import { GET_ME } from "@/app/libs/auth/api/graphql/queries";
import { useMutation } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
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

interface IAddItemModal {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItemModal = forwardRef<HTMLDivElement, IAddItemModal>(function AddItemModal({ setIsOpen }, ref) {
  const { sale } = useContext(ownerContext);
  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: [{ query: GET_ME }],
  });

  const [formState, setFormState] = useState<formState>({ name: "", price: "", quantity: "", description: "", sale });

  const { setNotification } = useContext(Notification);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    if (!formState.name || !formState.price || !formState.quantity) {
      setNotification({
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }
    try {
      const { data } = await addItem({
        variables: {
          ...formState,
        },
      });

      if (data.errors) {
        throw new Error("Error adding item");
      } else {
        setNotification({
          message: "Item added successfully",
          type: "success",
        });
        setFormState({ sale: null, name: "", price: "", description: "", quantity: "" });
        document.body.style.overflow = "auto";
        setIsOpen(false);
      }
    } catch (error) {
      setNotification({
        message: "Error adding item",
        type: "error",
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.0, type: "tween" }} className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div initial={{ x: "-100vw" }} animate={{ x: 0 }} exit={{ x: "-100vw" }} transition={{ duration: 0.8, delay: 0.2, type: "tween" }} className="relative z-50 flex flex-col items-center justify-center gap-4 rounded-lg border border-teal-500 bg-slate-800 bg-opacity-55 p-6 backdrop-blur-md" ref={ref}>
        <div className="absolute right-0 top-0 p-2">
          <button
            onClick={() => {
              setIsOpen(false);
              document.body.style.overflow = "auto";
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 p-2 text-center text-white transition duration-500 hover:scale-105 hover:bg-red-700"
          >
            X
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-4xl text-yellow-300">Add Item</h2>
          <form className="flex flex-col gap-2" onSubmit={handleAddItem}>
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
              Add Item
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default AddItemModal;
