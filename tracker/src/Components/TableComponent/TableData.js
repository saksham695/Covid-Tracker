import React from "react";

export default function TableData({
  countryWiseCovidData = [],
  pageNumber = 1,
}) {
  const MAX_VIEWABLE_DATA_PER_PAGE = 7;
  const startIndexOfData = (pageNumber - 1) * MAX_VIEWABLE_DATA_PER_PAGE;
  const lastIndexOfData = pageNumber * MAX_VIEWABLE_DATA_PER_PAGE;
  return (
    <>
      {countryWiseCovidData &&
        countryWiseCovidData.length &&
        countryWiseCovidData
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
}
