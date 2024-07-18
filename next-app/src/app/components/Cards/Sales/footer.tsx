interface ISalesCardFooterProps {
  location: string;
  discount: number;
  _id: string;
}

import CardLink from "../CardLink";

export default function SalesCardFooter({ location, discount, _id }: ISalesCardFooterProps) {
  return (
    <div className="flex flex-col justify-start border-t border-red-600 p-2">
      <p className="text-xs text-white">{location}</p>
      <CardLink href={`/sales/${_id}`}>View Sale</CardLink>
    </div>
  );
}
