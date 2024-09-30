import { Button, Card } from "flowbite-react";

export default function Tabulate({ columns, data }) {
  const exportToCSV = () => {
    if (!data) return;
    const headers = columns.map((col) => col.name).join(",");
    const rows = data.map((item) =>
      columns.map((col) => item[col.dataKey] || col.nullValue).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4 flex justify-end">
        <Button
          onClick={exportToCSV}
          className="bg-blue-500 enabled:hover:bg-blue-600"
        >
          Export CSV
        </Button>
      </div>
      <div className="flex-1">
        <div className="flex gap-0 text-sm px-5 mb-3 text-black/50">
          {columns.map((column, key) => (
            <div key={key} style={{ width: columns[key].width }}>
              <p>{columns[key].name}</p>
            </div>
          ))}
        </div>
        <div className="flex-1">
          {data?.map((item, key) => (
            <Card className="mb-2 w-full overflow-y-scroll">
              <div className="text-black/70 flex gap-4 items-start text-sm">
                <div className="flex flex-row">
                  {columns.map((column, key) => (
                    <div
                      className="flex-shrink-0"
                      style={{ width: columns[key].width }}
                    >
                      <p className="text-sm">
                        {item[column?.dataKey] ?? column.nullValue}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
