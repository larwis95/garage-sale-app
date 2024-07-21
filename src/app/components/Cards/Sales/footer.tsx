interface ISalesCardFooterProps {
  location: string;
  _id: string;
}

import CardLink from "../CardLink";

export default function SalesCardFooter({ location, _id }: ISalesCardFooterProps) {
  return (
    <div className="flex flex-grow flex-col justify-start gap-1 border-t border-red-600 p-2">
      <CardLink href={`/sales/${_id}`}>View Sale</CardLink>
      <p className="text-xs text-white">{location}</p>
    </div>
  );
}
