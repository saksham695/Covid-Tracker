import React, { useState } from "react";

export default function PageNumberComponent({
  pageNumber = "",
  totalPages = 0,
  onPageNumberChange,
}) {
  const [newPageNumber, setNewPageNumber] = useState(pageNumber);

  const onChange = (e) => {
    onPageNumberChange(`${e.target.value}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "space-evenly",
      }}
    >
      <input
        type="text"
        value={`${pageNumber}`}
        style={{
          width: "26%",
          height: "80%",
          textAlign: "center",
          borderRadius: 10,
          paddingBottom: "1%",
        }}
        onChange={onChange}
      />
      <div
        style={{ paddingTop: "8%", color: "rgba(7,94,181)" }}
      >{` of ${totalPages} pages`}</div>
    </div>
  );
}
