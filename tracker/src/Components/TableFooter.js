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
      iconName: "first_page",
      iconColor: FIRST_PAGE_COLOR_ICON_COLOR,
      type: "icon",
      onPageNumberChange: setFirstPage,
    },
    {
      iconName: "chevron_left",
      iconColor: FIRST_PAGE_COLOR_ICON_COLOR,
      type: "icon",
      onPageNumberChange: decrementPageNumber,
    },
    {
      iconName: "",
      iconColor: "",
      type: "text",
      onPageNumberChange: setSearchedPage,
    },
    {
      iconName: "chevron_right",
      iconColor: LAST_PAGE_COLOR_ICON_COLOR,
      type: "icon",
      onPageNumberChange: incrementPageNumber,
    },
    {
      iconName: "last_page",
      iconColor: LAST_PAGE_COLOR_ICON_COLOR,
      type: "icon",
      onPageNumberChange: setLastPage,
    },
  ];

  const renderFooterComponent = (tableFooterData = []) => {
    return (
      <>
        {tableFooterData.map(
          ({ iconName, iconColor, type, onPageNumberChange }) =>
            type === "icon" ? (
              <IconComponent
                iconName={iconName}
                iconColor={iconColor}
                onPageNumberChange={onPageNumberChange}
              />
            ) : (
              <PageNumberComponent
                pageNumber={pageNumber}
                totalPages={totalPages}
                onPageNumberChange={onPageNumberChange}
              />
            )
        )}
      </>
    );
  };

  return (
    <div
      style={{
        marginTop: "1%",
        height: 50,
        display: "flex",
        paddingTop: "2%",
        paddingBottom: "1%",
        flexDirection: "row",
        backgroundColor: " rgba(108, 117, 124,0.2)",
      }}
    >
      {renderFooterComponent(tableFooterData)}
    </div>
  );
}
