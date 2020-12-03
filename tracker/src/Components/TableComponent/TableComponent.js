import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import { useStateValue } from "../../store/StateProvider";
import TableFooter from "./TableFooter";

import "./TableComponent.css";
import TableData from "./TableData";
import { tableHeaders } from "../../utils/utils";
import { ACTIONS } from "../../store/action";

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
    countryWiseCovidData && countryWiseCovidData.length
      ? setPageNumber(1)
      : setPageNumber(0);
    countryWiseCovidData && countryWiseCovidData.length
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
    countryWiseCovidData && countryWiseCovidData.length > 0
      ? setPageNumber(1)
      : setPageNumber(0);
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

  const onSearchCountry = (e) => {
    setSearchCountry(e.target.value.toUpperCase());
    setTimeout(() => {
      dispatch({
        type: ACTIONS.SEARCH_COUNTER,
        payload: e.target.value.toUpperCase(),
      });
    }, 100);
  };

  return (
    <div
      className="table-container"
      style={{ height: "100%", width: "80%", marginBottom: "5%" }}
    >
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
              <tbody>
                <tr style={{ padding: "20%" }}>
                  <td className="table-data">
                    <h3
                      style={{
                        color: "red",
                        padding: "30%",
                        top: 0,
                        marginBottom: "40%",
                      }}
                    >
                      {" "}
                      {searchCountry} Not Found
                    </h3>
                  </td>
                </tr>
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
        height: 50,
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
          width: "100%",
          backgroundColor: "rgba(108, 117, 124, 0.1)",
          border: 0,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        }}
      ></input>
    </div>
  );
};
