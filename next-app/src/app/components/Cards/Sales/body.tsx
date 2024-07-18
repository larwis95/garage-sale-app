interface ISalesCardBodyProps {
  description: string;
}

export default function SalesCardBody({ description }: ISalesCardBodyProps) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-around p-2">
      <p className="text-md text-white">{description}</p>
    </div>
  );
}
