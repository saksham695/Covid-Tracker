import React from "react";

import "./TableComponent.css";

export default function TableHeader({
  tableHeaders = [],
  onSortingHeaderChange,
}) {
  return (
    <table cellPadding="0" cellSpacing="0" border="0">
      <thead>
        <tr>
          {tableHeaders.map((heading, index) => (
            <th className="table-heading" key={index}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                }}
                onClick={() => onSortingHeaderChange(heading)}
              >
                {heading}
                <i className="material-icons">arrow_drop_up</i>
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
