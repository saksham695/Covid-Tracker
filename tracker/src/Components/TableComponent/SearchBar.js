import React from "react";

export default function SearchBar({ onSearchCountry, searchCountry = "" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: 50,
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "rgba(108, 117, 124, 0.1)",
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          display: "flex",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <i
          className="material-icons"
          style={{
            color: "rgba(108, 117, 124, 0.8)",
          }}
        >
          {" "}
          search
        </i>
      </div>
      <input
        type="text"
        placeholder="Country Name"
        value={searchCountry}
        onChange={onSearchCountry}
        style={{
          backgroundColor: "rgba(108, 117, 124, 0.1)",
          border: 0,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          width: "100%",
        }}
      ></input>
    </div>
  );
}
