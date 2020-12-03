import React, { useState, useEffect } from "react";

import SearchBar from "./SearchBar";
import TableData from "./TableData";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import { ACTIONS } from "../../store/action";
import { tableHeaders } from "../../utils/utils";
import { useStateValue } from "../../store/StateProvider";

import "./TableComponent.css";

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
        type: ACTIONS.SEARCH_COUNTRY,
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
              <tbody>{renderErrorComponent(searchCountry)}</tbody>
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

const renderErrorComponent = (searchCountry) => {
  return (
    <tr style={{ padding: "20%" }}>
      <h3
        style={{
          color: "red",
        }}
      >
        {searchCountry} Country Not Found
      </h3>
    </tr>
  );
};
