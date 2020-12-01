import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import { useStateValue } from "../StateProvider";
import TableFooter from "./TableFooter";

import "./TableComponent.css";
import TableData from "./TableData";
import { tableHeaders } from "../utils/utils";

export default function TableComponent(props) {
  const [
    { countryWiseCovidData, searchedItemList },
    dispatch,
  ] = useStateValue();
  const [pageNumber, setPageNumber] = useState(0);
  const [lastPage, setLastPageNumber] = useState(0);
  const [searchCountry, setSearchCountry] = useState("");
  const [sortedHeaderName, setSortedHeaderName] = useState("");
  const FIRST_PAGE = 1;
  const DATA_PER_PAGE = 7;

  useEffect(() => {
    countryWiseCovidData.length ? setPageNumber(1) : setPageNumber(0);
    countryWiseCovidData.length
      ? setLastPageNumber(
          Math.ceil(countryWiseCovidData.length / DATA_PER_PAGE)
        )
      : setLastPageNumber(0);
  }, [countryWiseCovidData, searchedItemList]);

  useEffect(() => {
    searchedItemList.length > 0
      ? setLastPageNumber(Math.ceil(searchedItemList.length / DATA_PER_PAGE))
      : setLastPageNumber(
          Math.ceil(countryWiseCovidData.length / DATA_PER_PAGE)
        );
  }, [searchedItemList, searchCountry]);

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
    if (pageNumber > lastPage - 1) {
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
    setPageNumber(parseInt(lastPage));
  };

  const setSearchedPage = (value = "") => {
    if (value === "") {
      setPageNumber("");
    } else value && setPageNumber(parseInt(value));
  };

  console.log(
    "SEARCHED ITEM",
    searchedItemList.length,
    countryWiseCovidData.length
  );

  const onSearchCountry = (e) => {
    setSearchCountry(e.target.value.toUpperCase());
    setTimeout(() => {
      dispatch({
        type: "Search",
        payload: e.target.value.toUpperCase(),
      });
    }, 100);
  };

  return (
    <div className="table-container" style={{ height: "60%", width: "40%" }}>
      <SearchBar
        searchCountry={searchCountry}
        onSearchCountry={onSearchCountry}
      />
      <div className="table-data-container">
        <TableHeader
          tableHeaders={tableHeaders}
          onSortingHeaderChange={onSortingHeaderChange}
        />
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            {searchedItemList.length === 0 && searchCountry.length !== 0 ? (
              <tbody style={{ padding: "20%" }}>
                <td>
                  <tr style={{ color: "red" }}>Invalid Country</tr>
                </td>
              </tbody>
            ) : (
              <tbody>
                <TableData
                  countryWiseCovidData={
                    searchedItemList?.length
                      ? searchedItemList
                      : countryWiseCovidData
                  }
                  pageNumber={pageNumber}
                />
              </tbody>
            )}
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
        totalPages={lastPage}
      />
    </div>
  );
}

const SearchBar = ({ onSearchCountry, searchCountry = "" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "5%",
        padding: "2%",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "rgba(108, 117, 124, 0.1)",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          width: "90%",
          backgroundColor: "rgba(108, 117, 124, 0.1)",
          border: 0,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        }}
      ></input>
    </div>
  );
};
