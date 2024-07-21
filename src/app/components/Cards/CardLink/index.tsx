import Link from "next/link";
import React from "react";

interface ICardLink {
  href: string;
  children: React.ReactNode;
}

export default function CardLink({ href, children }: ICardLink) {
  return (
    <Link href={href} className="w-fit rounded-lg border-b border-white p-1 transition duration-500 hover:scale-105 hover:border-r hover:border-red-700 hover:text-red-500">
      {children}
    </Link>
  );
}
