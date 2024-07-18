import { format } from "date-fns";

interface ISalesCardHeaderProps {
  title: string;
  startDate: string;
  endDate: string;
}

export default function SalesHeader({ title, startDate, endDate }: ISalesCardHeaderProps) {
  const formattedStartDate = format(new Date(Number(startDate)), "MM/dd/yy");
  const formattedEndDate = format(new Date(Number(endDate)), "MM/dd/yy");

  return (
    <div className="top-0 flex w-full flex-col border-b border-red-600 p-2 text-left">
      <h2 className="text-2xl font-bold">{title}</h2>
      <small className="text-sm text-gray-500">
        {formattedStartDate} - {formattedEndDate}
      </small>
    </div>
  );
}
