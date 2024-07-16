interface ISalesCardBodyProps {
  description: string;
}

export default function SalesCardBody({ description }: ISalesCardBodyProps) {
  return (
    <div className="flex flex-col justify-between p-4">
      <div className="flex flex-col">
        <p className="text-sm text-white">{description}</p>
      </div>
    </div>
  );
}
