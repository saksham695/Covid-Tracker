import React from "react";

import IconComponent from "./IconComponent";
import PageNumberComponent from "./PageNumberComponent";

export default function TableFooter({
  pageNumber = 1,
  incrementPageNumber,
  decrementPageNumber,
  setFirstPage,
  setLastPage,
  setSearchedPage,
  totalPages = 0,
}) {
  const FIRST_PAGE_COLOR_ICON_COLOR =
    pageNumber < 2 ? "grey" : "rgba(7,94,181,0.7)";
  const LAST_PAGE_COLOR_ICON_COLOR =
    pageNumber >= totalPages ? "grey" : "rgba(7,94,181,0.7)";
  const tableFooterData = [
    {
      iconColor: FIRST_PAGE_COLOR_ICON_COLOR,
      iconName: "first_page",
      onPageNumberChange: setFirstPage,
      type: "icon",
    },
    {
      iconColor: FIRST_PAGE_COLOR_ICON_COLOR,
      iconName: "chevron_left",
      onPageNumberChange: decrementPageNumber,
      type: "icon",
    },
    {
      iconColor: "",
      iconName: "",
      onPageNumberChange: setSearchedPage,
      type: "text",
    },
    {
      iconColor: LAST_PAGE_COLOR_ICON_COLOR,
      iconName: "chevron_right",
      onPageNumberChange: incrementPageNumber,
      type: "icon",
    },
    {
      iconColor: LAST_PAGE_COLOR_ICON_COLOR,
      iconName: "last_page",
      onPageNumberChange: setLastPage,
      type: "icon",
    },
  ];

  const renderFooterComponent = (tableFooterData = []) => {
    return (
      <>
        {tableFooterData.map(
          ({ iconName, iconColor, type, onPageNumberChange }) =>
            type === "icon" ? (
              <IconComponent
                iconColor={iconColor}
                iconName={iconName}
                key={iconName}
                onPageNumberChange={onPageNumberChange}
              />
            ) : (
              <PageNumberComponent
                key={iconName}
                onPageNumberChange={onPageNumberChange}
                pageNumber={pageNumber}
                totalPages={totalPages}
              />
            )
        )}
      </>
    );
  };

  return (
    <div
      style={{
        backgroundColor: " rgba(108, 117, 124,0.2)",
        display: "flex",
        flexDirection: "row",
        height: 50,
        marginTop: "1%",
        paddingBottom: "1%",
        paddingTop: "2%",
      }}
    >
      {renderFooterComponent(tableFooterData)}
    </div>
  );
}
