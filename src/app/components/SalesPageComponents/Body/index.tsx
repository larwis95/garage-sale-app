import { motion } from "framer-motion";
import { GET_ME } from "@/app/libs/auth/api/graphql/queries";
import { DELETE_ITEM } from "@/app/libs/auth/api/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState, useContext, useRef, useEffect } from "react";
import ownerContext from "@/app/providers/Owner";
import { Notification } from "@/app/providers/Notification";
import { AnimatePresence } from "framer-motion";
import EditItemModal from "../Modals/EditItem";

interface IItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

interface ISalesBodyProps {
  items: IItem[];
}

export default function SaleBody({ items }: ISalesBodyProps) {
  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: GET_ME }],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<IItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOwner } = useContext(ownerContext);
  const { setNotification } = useContext(Notification);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalOpen(false);
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 sm:min-w-full">
        <div className="sm:min-w-screen flex flex-col items-center justify-center rounded-lg border border-teal-500 bg-slate-600 align-top md:min-w-[50%] lg:min-w-[33%]">
          <div className="flex flex-col flex-wrap items-center justify-center gap-2 p-4">
            <div className="flex w-full items-center justify-center border-b border-teal-500 text-center sm:min-w-full">
              <h2 className="text-4xl text-yellow-300">No items available</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <AnimatePresence>{modalOpen && editItem && <EditItemModal ref={modalRef} setIsOpen={setModalOpen} item={editItem} />}</AnimatePresence>
      <div className="flex w-screen flex-col items-center justify-center gap-4">
        <h2 className="text-4xl text-yellow-300">Items</h2>
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2 rounded-lg border border-teal-500 bg-slate-800 p-4 sm:flex-col md:flex-col lg:w-[50%] lg:flex-row">
          {items.map((item) => (
            <motion.div key={item._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex w-full flex-col items-center justify-center rounded-lg border border-teal-500 bg-slate-600 align-top shadow-md shadow-black sm:w-full md:w-[50%] lg:w-[33%]">
              <div className="flex-grow-1 flex h-full min-w-full flex-col flex-wrap items-center justify-center gap-2 p-4">
                <div className="flex w-full items-center justify-center border-b border-teal-500">
                  <h2 className="text-2xl text-yellow-300">{item.name}</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg text-white">Price: ${item.price.toPrecision(3)}</p>
                  <p className="text-lg text-white">Quantity: {item.quantity}</p>
                  <p className="text-lg text-white">{item.description}</p>
                </div>
                {isOwner && (
                  <div className="flex w-full flex-row items-center justify-center gap-2">
                    <button
                      className="w-full rounded-lg border border-white bg-blue-500 p-1 text-white transition duration-500 hover:scale-105 hover:border-blue-500 hover:bg-black"
                      onClick={() => {
                        setEditItem(item);
                        setModalOpen(true);
                        document.body.style.overflow = "hidden";
                      }}
                    >
                      Edit
                    </button>
                    <button
                      key={item._id}
                      className="w-full rounded-lg border border-white bg-red-500 p-1 text-white transition duration-500 hover:scale-105 hover:border-red-500 hover:bg-black"
                      onClick={async () => {
                        try {
                          const { data } = await deleteItem({ variables: { _id: item._id } });
                          if (data.errors) {
                            throw new Error("Error deleting item");
                          } else {
                            setNotification({
                              message: "Item deleted successfully",
                              type: "success",
                            });
                          }
                        } catch (error) {
                          setNotification({
                            message: "Error deleting item",
                            type: "error",
                          });
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
