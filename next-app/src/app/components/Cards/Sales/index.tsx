"use client";
import SalesHeader from "./header";
import SalesBody from "./body";
import SalesFooter from "./footer";
import { motion, AnimatePresence } from "framer-motion";

interface ISalesCardProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  discount: number;
  recurring: boolean;
  _id: string;
}

export default function SalesCard({ title, category, startDate, endDate, location, description, discount, recurring, _id }: ISalesCardProps) {
  return (
    <motion.div className="relative flex h-full w-full flex-col justify-around rounded-lg border border-white bg-slate-800 shadow-md" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.5 }}>
      <SalesHeader title={title} startDate={startDate} endDate={endDate} />
      <SalesBody description={description} />
      <SalesFooter discount={discount} location={location} _id={_id} />
    </motion.div>
  );
}
