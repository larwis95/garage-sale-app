"use client";

import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Notification } from "@/app/providers/Notification";
import { AnimatePresence } from "framer-motion";

export default function NotificationBox() {
  const { notification, setNotification } = useContext(Notification) || {};
  const { message, type } = notification || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: null, type: "success" });
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <AnimatePresence>
      {message && (
        <motion.div key="notification" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 1.0, type: "spring", stiffness: 100 }} className={`fixed bottom-0 right-0 flex flex-col gap-4 p-2 ${type === "error" ? "bg-red-400" : "bg-green-400"} z-[100] h-16 items-center justify-center rounded-lg border-2 border-white text-center text-white shadow-md`}>
          <p className="text-center text-sm text-white">{message}</p>
          <button className="absolute right-0 top-0 h-5 w-5 text-xs transition duration-500 hover:scale-105 hover:border-black hover:bg-white hover:text-black" onClick={() => setNotification({ message: null, type: "success" })}>
            X
          </button>
          <motion.div className="h-1 w-full rounded-full bg-white" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 5 }} style={{ originX: "left", originY: "center" }}></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
