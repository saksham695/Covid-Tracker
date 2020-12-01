import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import { useStateValue } from "../StateProvider";
import TableFooter from "./TableFooter";

import "./TableComponent.css";

export default function TableComponent(props) {
  const [
    {
      countryWiseCovidData,
      numberOfConfirmedWiseData,
      numberOfRecoveredWiseData,
      numberOfDeathsWiseData,
      globalCases,
    },
    dispatch,
  ] = useStateValue();
  const [pageNumber, setPageNumber] = useState(0);
  const [sortedHeaderName, setSortedHeaderName] = useState("");
  const FIRST_PAGE = 1;
  const DATA_PER_PAGE = 7;
  const LAST_PAGE = Math.ceil(countryWiseCovidData.length / DATA_PER_PAGE);

  console.log(countryWiseCovidData[10]);

  useEffect(() => {
    countryWiseCovidData.length > 0 ? setPageNumber(1) : setPageNumber(0);
  }, [countryWiseCovidData.length]);

  useEffect(() => {
    countryWiseCovidData.length > 0 ? setPageNumber(1) : setPageNumber(0);
  }, [sortedHeaderName]);

  const onSortingHeaderChange = (header = "") => {
    setSortedHeaderName(header);
    dispatch({
      type: header,
      payload: countryWiseCovidData,
    });
  };

  const incrementPageNumber = (value = "") => {
    if (pageNumber > LAST_PAGE) {
      setLastPage();
    } else setPageNumber(pageNumber + 1);
  };

  const decrementPageNumber = (value = "") => {
    if (pageNumber < 2) {
      setFirstPage();
    } else setPageNumber(pageNumber - 1);
  };

  const setFirstPage = (value = "") => {
    setPageNumber(parseInt(FIRST_PAGE));
  };

  const setLastPage = (value = "") => {
    setPageNumber(parseInt(LAST_PAGE));
  };

  const setSearchedPage = (value = "") => {
    if (value === "") {
      setPageNumber("");
    } else value && setPageNumber(parseInt(value));
  };

  const tableHeaders = ["Country", "Confirmed", "Recovered", "Death"];
  return (
    <div className="table-container" style={{ height: "60%", width: "40%" }}>
      <div className="table-data-container">
        <TableHeader
          tableHeaders={tableHeaders}
          onSortingHeaderChange={onSortingHeaderChange}
        />
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              <TableData
                countryWiseCovidData={countryWiseCovidData}
                pageNumber={pageNumber}
              />
            </tbody>
          </table>
        </div>
      </div>
      <TableFooter
        pageNumber={pageNumber}
        incrementPageNumber={incrementPageNumber}
        decrementPageNumber={decrementPageNumber}
        setFirstPage={setFirstPage}
        setLastPage={setLastPage}
        setSearchedPage={setSearchedPage}
        totalPages={LAST_PAGE}
      />
    </div>
  );
}

const TableData = ({ countryWiseCovidData = [], pageNumber = 1 }) => {
  const MAX_VIEWABLE_DATA_PER_PAGE = 7;
  const startIndexOfData = (pageNumber - 1) * MAX_VIEWABLE_DATA_PER_PAGE;
  const lastIndexOfData = pageNumber * MAX_VIEWABLE_DATA_PER_PAGE;
  console.log("<><><", countryWiseCovidData);
  return (
    <>
      {countryWiseCovidData
        .slice(startIndexOfData, lastIndexOfData)
        .map(
          ({
            Country,
            CountryCode,
            NewConfirmed,
            TotalConfirmed,
            TotalDeaths,
            TotalRecovered,
          }) => {
            return (
              <tr key={CountryCode}>
                <td
                  className="table-data"
                  style={{
                    color: "rgb(108, 117, 124)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {Country}{" "}
                </td>
                <td className="table-data">{TotalConfirmed}</td>
                <td className="table-data">{TotalRecovered}</td>
                <td className="table-data">{TotalDeaths}</td>
              </tr>
            );
          }
        )}
    </>
  );
};
