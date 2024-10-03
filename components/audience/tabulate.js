import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button, Card } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";

export default function Tabulate({ columns, data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const exportToCSV = () => {
    if (!data) return;
    const headers = columns.map((col) => col.name).join(",");
    const rows = filteredData.map((item) =>
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

  const performSearch = () => {
    if (searchPhrase.length > 0) {
      const terms = searchPhrase.split(" ").filter(Boolean);

      const positiveTerms = terms
        .filter((term) => !term.startsWith("-"))
        .map((term) => term.toLowerCase());

      const negativeTerms = terms
        .filter((term) => term.startsWith("-"))
        .map((term) => term.slice(1).toLowerCase());

      const filtered = data.filter((item) => {
        const matchesPositive =
          positiveTerms.length === 0 ||
          columns.some(
            (column) =>
              column.searchable &&
              positiveTerms.some((term) =>
                item[column.dataKey]?.toString().toLowerCase().includes(term)
              )
          );

        const matchesNegative =
          negativeTerms.length === 0 ||
          columns.every(
            (column) =>
              column.searchable &&
              negativeTerms.every(
                (term) =>
                  !item[column.dataKey]?.toString().toLowerCase().includes(term)
              )
          );

        return matchesPositive && matchesNegative;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    },
    [performSearch]
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-4 flex justify-between">
        <div className="bg-white rounded-full px-4 overflow-hidden flex items-center gap-2">
          <MagnifyingGlassIcon className="h-5" />
          <input
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
            className="text-sm h-full appearance-none outline-none"
            placeholder={`Search ${filteredData?.length || 0} records`}
            onKeyDown={handleKeyDown}
          />
        </div>

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
          {filteredData?.map((item, key) => (
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
