"use client";

import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Notification } from "@/app/providers/Notification";

export default function NotificationBox() {
  const { notification, setNotification } = useContext(Notification) || {};
  const { message, type } = notification || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: null, type: "success" });
    }, 5000);
    return () => clearTimeout(timer);
  });

  if (!message) return null;
  return (
    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }} className={`fixed bottom-0 right-0 flex gap-4 p-4 ${type === "error" ? "bg-red-400" : "bg-green-400"} h-20 items-center justify-center rounded-lg border-2 border-white text-center text-white shadow-md`}>
      <p className="text-center text-sm text-white">{message}</p>
      <button className="absolute right-2 top-1 h-5 w-5 rounded-sm border border-white text-sm transition duration-500 hover:scale-105 hover:border-black hover:bg-white hover:text-black" onClick={() => setNotification({ message: null, type: "success" })}>
        X
      </button>
    </motion.div>
  );
}
