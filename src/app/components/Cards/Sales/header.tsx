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
    <div className="flex flex-col border-b border-teal-500 p-2 ">
      <h2 className="text-2xl font-bold">{title}</h2>
      <small className="text-sm text-gray-300">
        {formattedStartDate} - {formattedEndDate}
      </small>
    </div>
  );
}
