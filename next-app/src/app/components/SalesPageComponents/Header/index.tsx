import { useContext, useRef, useState, useEffect } from "react";
import ownerContext from "@/app/providers/Owner";
import AddItemModal from "../Modals/AddItem";
import { AnimatePresence } from "framer-motion";

interface ISaleHeaderProps {
  title: string;
  description: string;
}

export default function SaleHeader({ title, description }: ISaleHeaderProps) {
  const { isOwner } = useContext(ownerContext);
  const ref = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"additem" | "edititem" | "editsale">("additem");

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <div className="fixed right-0 top-[15%] z-[49] flex flex-col items-center justify-center">{isOwner && <button className="sticky w-24 rounded bg-blue-500 p-2 font-bold text-yellow-300 transition duration-500 hover:scale-105 hover:bg-blue-700 hover:text-white">Edit Sale</button>}</div>
      <div className="fixed right-0 top-[22%] z-[49] flex flex-col items-center justify-center">
        {isOwner && (
          <button
            onClick={() => {
              setModalType("additem");
              document.body.style.overflow = "hidden";
              setModalOpen(true);
            }}
            className="sticky w-24 rounded bg-blue-500 p-2 font-bold text-yellow-300 transition duration-500 hover:scale-105 hover:bg-blue-700 hover:text-white"
          >
            Add Item
          </button>
        )}
      </div>
      <AnimatePresence>{modalOpen && modalType === "additem" && <AddItemModal ref={ref} setIsOpen={setModalOpen} />}</AnimatePresence>
      <div className="mb-24 flex min-h-[50%] min-w-full items-center justify-center">
        <div className="relative flex flex-col items-center justify-center rounded-lg border border-yellow-300 bg-slate-600 p-4 align-top sm:min-w-full md:min-w-[50%] lg:min-w-[33%]">
          <div className="flex min-h-max flex-col flex-wrap items-center justify-center gap-2 p-4">
            <div className="border-b border-yellow-300">
              <h2 className="text-4xl text-yellow-300">{title}</h2>
            </div>
            <div>
              <p className="text-lg text-white">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
