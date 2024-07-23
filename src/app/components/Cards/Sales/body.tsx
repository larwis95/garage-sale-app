interface ISalesCardBodyProps {
  description: string;
}

export default function SalesCardBody({ description }: ISalesCardBodyProps) {
  return (
    <div className="flex flex-col p-2">
      <p className="text-md text-white">{description}</p>
    </div>
  );
}
