"use client";
import SalesHeader from "./header";
import SalesBody from "./body";
import SalesFooter from "./footer";
import { motion, AnimatePresence } from "framer-motion";

interface ISalesCardProps {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  _id: string;
}

export default function SalesCard({ title, startDate, endDate, location, description, _id }: ISalesCardProps) {
  return (
    <motion.div className="m-2 flex flex-col justify-around rounded-lg border border-teal-500 bg-slate-800 shadow-md" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.5 }}>
      <SalesHeader title={title} startDate={startDate} endDate={endDate} />
      <SalesBody description={description} />
      <SalesFooter location={location} _id={_id} />
    </motion.div>
  );
}
