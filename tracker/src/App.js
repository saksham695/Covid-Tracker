import React, { useEffect } from "react";
import axios from "./Api/axios";
import CardComponent from "./Components/CardComponent/CardComponent";
import PieChartComponent from "./Components/ChartComponent/PieChartComponent";
import TableComponent from "./Components/TableComponent/TableComponent";

import { useStateValue } from "./store/StateProvider";
import {
  COUNTRIES,
  GlobalCasesHeading,
  GlobalCasesKey,
  numberWithCommas,
  TOTAL_PATIENTS,
  WORLD_STATISTICS,
} from "./utils/utils";

import "./App.css";

export default function App() {
  const [{ globalCases }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      await axios({
        method: "get",
        url: `/summary`,
      }).then((res) =>
        dispatch({
          type: "add",
          payload: res.data,
        })
      );
    }
    fetchData();
  }, []);

  const totalPatients =
    globalCases[GlobalCasesKey[0]] +
    globalCases[GlobalCasesKey[1]] +
    globalCases[GlobalCasesKey[2]];

  return (
    <div style={{ height: "100vw", width: "100%" }}>
      {renderTopComponent(globalCases)}
      <div>
        <h1 style={{ marginTop: "-23%", fontWeight: "bolder" }}>
          {WORLD_STATISTICS.toUpperCase()}
        </h1>
        {renderMiddleSection(totalPatients)}
      </div>
      {renderTable()}
    </div>
  );
}

const renderMiddleSection = (totalPatients = 0) => {
  return (
    <div className="middle-component-container">
      <div
        className="card-left-container"
        style={{ marginTop: "14%", borderRadius: 20, marginBottom: "2%" }}
      >
        <h2 className="text-style" style={{ letterSpacing: "10" }}>
          {TOTAL_PATIENTS.toUpperCase()}
        </h2>
        <h1 className="text-style">
          {totalPatients ? numberWithCommas(totalPatients) : ""}
        </h1>
      </div>

      <div className="pie-char-container">
        <PieChartComponent />
      </div>
    </div>
  );
};

const renderTable = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <h2 className="text-style">{COUNTRIES.toUpperCase()}</h2>
      <div style={{ marginLeft: "20%" }}>
        <TableComponent />
      </div>
    </div>
  );
};

const renderTopComponent = (globalCases) => {
  return (
    <div className="card-right-container">
      {GlobalCasesKey.map((item, index) => (
        <CardComponent
          title={GlobalCasesHeading[index]}
          cases={globalCases[item]}
          casesKey={item}
        />
      ))}
    </div>
  );
};
