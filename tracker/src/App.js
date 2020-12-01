import React, { useEffect } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import "./App.css";
import TableComponent from "./Components/TableComponent";
export default function App() {
  const [{}, dispatch] = useStateValue();

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

  return (
    <div style={{ height: "100vw" }}>
      <TableComponent />
    </div>
  );
}
