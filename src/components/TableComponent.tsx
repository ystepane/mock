import React from "react";

interface Props {
  data: string[][];
}

const TableComponent: React.FC<Props> = ({ data }) => {
  return (
    <table className="centered-table">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
