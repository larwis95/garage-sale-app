import { format } from "date-fns";

interface ISalesCardHeaderProps {
  title: string;
  startDate: string;
  endDate: string;
}

export default function SalesHeader({ title, startDate, endDate }: ISalesCardHeaderProps) {
  console.log("SalesHeader", title, typeof startDate, endDate);
  console.log(startDate.toLocaleString());
  const formattedStartDate = format(startDate, "MM/dd/yyyy");
  const formattedEndDate = format(endDate, "MM/dd/yyyy");

  return (
    <div className="top-0 flex w-full flex-grow flex-col border-b border-red-600 p-2 text-left">
      <h2 className="text-2xl font-bold">{title}</h2>
      <small className="text-sm text-gray-500">
        {formattedStartDate} - {formattedEndDate}
      </small>
    </div>
  );
}
