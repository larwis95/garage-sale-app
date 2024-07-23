import Link from "next/link";
import React from "react";

interface ICardLink {
  href: string;
  children: React.ReactNode;
}

export default function CardLink({ href, children }: ICardLink) {
  return (
    <Link href={href} className="w-fit rounded-lg border-b border-white p-1 transition duration-500 hover:scale-105 hover:bg-teal-400 hover:border-teal-500 hover:font-bold hover:text-black">
      {children}
    </Link>
  );
}
