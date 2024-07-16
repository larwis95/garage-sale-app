interface ISalesCardFooterProps {
  location: string;
  discount: number;
  _id: string;
}

export default function SalesCardFooter({
  location,
  discount,
  _id,
}: ISalesCardFooterProps) {
  return (
    <div className="flex flex-col justify-between p-4">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{discount}</p>
      </div>
      <a href={`/sales/${_id}`} className="text-sm text-blue-500">
        View Sale
      </a>
    </div>
  );
}
