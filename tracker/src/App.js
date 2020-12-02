import React, { useEffect } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import "./App.css";
import TableComponent from "./Components/TableComponent";
import CardComponent from "./Components/CardComponent/CardComponent";
import {
  GlobalCasesHeading,
  GlobalCasesKey,
  numberWithCommas,
} from "./utils/utils";
import PieChartComponent from "./Components/ChartComponent/PieChartComponent";
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
  const TOTAL_PATIENTS = "Total Patient";
  return (
    <div style={{ height: "100vw", width: "100%" }}>
      <div>
        <div className="card-right-container">
          {GlobalCasesKey.map((item, index) => (
            <CardComponent
              title={GlobalCasesHeading[index]}
              cases={globalCases[item]}
              casesKey={item}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 style={{ marginTop: "12%" }}>WORLD STATISTICS</h1>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <div className="card-left-container" style={{ marginTop: "20%" }}>
            <h4 className="text-style">{TOTAL_PATIENTS.toUpperCase()}</h4>
            <h2 className="text-style">{numberWithCommas(totalPatients)}</h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "row", paddingTop: "10%" }}
          >
            <PieChartComponent />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h2>COUNTRIES</h2>
        <div style={{ marginLeft: "20%" }}>
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
