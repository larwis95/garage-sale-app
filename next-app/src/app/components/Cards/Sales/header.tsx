import { format } from "date-fns";

interface ISalesCardHeaderProps {
  title: string;
  startDate: string;
  endDate: string;
}

export default function SalesHeader({
  title,
  startDate,
  endDate,
}: ISalesCardHeaderProps) {
  const formattedStartDate = format(new Date(Number(startDate)), "MM/dd/yy");
  const formattedEndDate = format(new Date(Number(endDate)), "MM/dd/yy");

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">
        {formattedStartDate} - {formattedEndDate}
      </p>
    </div>
  );
}
