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
  const TOTAL_PATIENTS = "Total Patients";
  const COUNTRIES = "countries";
  return (
    <div style={{ height: "100vw", width: "100%" }}>
      <div className="card-right-container">
        {GlobalCasesKey.map((item, index) => (
          <CardComponent
            title={GlobalCasesHeading[index]}
            cases={globalCases[item]}
            casesKey={item}
          />
        ))}
      </div>

      <div>
        <h1 style={{ marginTop: "-23%", fontWeight: "bolder" }}>
          WORLD STATISTICS
        </h1>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-around",
            //     alignContent: "center",
            alignItems: "flex-start",
            marginTop: "-8%",
          }}
        >
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
          marginTop: "10%",
        }}
      >
        <h2 className="text-style">{COUNTRIES.toUpperCase()}</h2>
        <div style={{ marginLeft: "20%" }}>
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
