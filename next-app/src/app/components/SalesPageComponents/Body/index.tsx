import { motion } from "framer-motion";
import { GET_ITEM, GET_ME } from "@/app/libs/auth/api/graphql/queries";
import { DELETE_ITEM, ADD_ITEM } from "@/app/libs/auth/api/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import ownerContext from "@/app/providers/Owner";
import { Notification } from "@/app/providers/Notification";

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

  console.log("items", items);

  const { isOwner } = useContext(ownerContext);
  const { setNotification } = useContext(Notification);
  console.log("body", isOwner);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 sm:min-w-full">
        <div className="sm:min-w-screen flex flex-col items-center justify-center rounded-lg border border-yellow-300 bg-slate-600 align-top md:min-w-[50%] lg:min-w-[33%]">
          <div className="flex flex-col flex-wrap items-center justify-center gap-2 p-4">
            <div className="flex w-full items-center justify-center border-b border-yellow-300 text-center sm:min-w-full">
              <h2 className="text-4xl text-yellow-300">No items available</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-col md:flex-col lg:flex-row">
        <h2 className="text-4xl text-yellow-300">Items</h2>
        {items.map((item) => (
          <motion.div key={item._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex w-full flex-col items-center justify-center rounded-lg border border-yellow-300 bg-slate-600 align-top sm:w-full md:w-[50%] lg:w-[25%]">
            <div className="flex-grow-1 flex h-full min-w-full flex-col flex-wrap items-center justify-center gap-2 p-4">
              <div className="flex w-full items-center justify-center text-nowrap border-b border-yellow-300">
                <h2 className="text-2xl text-yellow-300">{item.name}</h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-white">Price: ${item.price.toPrecision(3)}</p>
                <p className="text-lg text-white">Quantity: {item.quantity}</p>
                <p className="text-lg text-white">{item.description}</p>
              </div>
              {isOwner && (
                <button
                  key={item._id}
                  className="rounded-lg border border-white bg-red-500 p-1 text-white transition duration-500 hover:scale-105 hover:border-red-500 hover:bg-black"
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
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
