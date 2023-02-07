import { LayoutProps } from "@/scripts/types";
import { useState } from "react";

const displays = [
  "block",
  "inline-block",
  "inline",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "contents",
  "list-item",
  "hidden",
];
const positions = ["static", "fixed", "absolute", "relative", "sticky"];

type LayoutCardProps = {
  layoutProps: LayoutProps;
  setLayoutProps: (layoutProps: LayoutProps) => void;
};

export default function LayoutCard({
  layoutProps,
  setLayoutProps,
}: LayoutCardProps) {
  const [display, setDisplay] = useState(layoutProps.display || "block");
  const [position, setPosition] = useState(layoutProps.position || "static");
  const [centerChildren, setCenterChildren] = useState(
    layoutProps.centerChildren || false
  );
  const [rows, setRows] = useState(layoutProps.rows || 1);
  const [columns, setColumns] = useState(layoutProps.columns || 1);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLayoutProps({ display, position, centerChildren, rows, columns });
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 p-4">
      <select
        className="p-2 text-white bg-gray-500 rounded-full"
        onChange={(e) => setDisplay(e.target.value)}
        value={display}
      >
        {displays.map((display, i) => (
          <option value={display} key={i}>
            {display}
          </option>
        ))}
      </select>
      <select
        className="p-2 text-white bg-gray-500 rounded-full"
        onChange={(e) => setPosition(e.target.value)}
        value={position}
      >
        {positions.map((position, i) => (
          <option value={position} key={i}>
            {position}
          </option>
        ))}
      </select>
      {display.includes("flex") || display.includes("grid") ? (
        <div className="flex flex-row gap-4">
          <label className="flex flex-row items-center">
            <input
              type="checkbox"
              checked={centerChildren}
              onChange={(e) => setCenterChildren(e.target.checked)}
            />
            <span className="ml-2">Center Children</span>
          </label>
        </div>
      ) : null}

      {display.includes("grid") ? (
        <div className="flex flex-row gap-4">
          <label className="flex flex-row items-center">
            <span className="mr-2">Rows</span>
            <input
              type="number"
              min="0"
              max="12"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value))}
              className="p-2 text-white bg-gray-500 rounded-full"
            />
          </label>
          <label className="flex flex-row items-center">
            <span className="mr-2">Columns</span>
            <input
              type="number"
              min="0"
              max="12"
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value))}
              className="p-2 text-white bg-gray-500 rounded-full"
            />
          </label>
        </div>
      ) : null}

      <button
        className="p-2 text-white bg-blue-500 rounded-full"
        onClick={handleSubmit}
      >
        Set Layout
      </button>
    </div>
  );
}
