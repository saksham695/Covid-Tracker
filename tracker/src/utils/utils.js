/**
 *
 * @param country1
 * @param country2
 * method used by sorting function to sort according to country names
 */
export const compareCountry = (country1, country2) => {
  // Use toUpperCase() to ignore character casing
  const countryA = country1.Country.toUpperCase();
  const countryB = country2.Country.toUpperCase();
  if (countryA > countryB) {
    return 1;
  } else if (countryA < countryB) {
    return -1;
  }
  return 0;
};

/**
 *
 * @param country1
 * @param country2
 * method used by sorting function to sort according to country names
 */
export const compareByTotalDiseased = (country1, country2) => {
  // Use toUpperCase() to ignore character casing
  if (country1.TotalConfirmed > country2.TotalConfirmed) {
    return -1;
  } else if (country1.TotalConfirmed < country2.TotalConfirmed) {
    return 1;
  }
  return 0;
};

/**
 *
 * @param country1
 * @param country2
 * method used by sorting function to sort according to country names
 */
export const compareByTotalRecovered = (country1, country2) => {
  // Use toUpperCase() to ignore character casing
  if (country1.TotalRecovered > country2.TotalRecovered) {
    return -1;
  } else if (country1.TotalRecovered < country2.TotalRecovered) {
    return 1;
  }
  return 0;
};

/**
 *
 * @param country1
 * @param country2
 * method used by sorting function to sort according to country names
 */
export const compareByTotalDeaths = (country1, country2) => {
  // Use toUpperCase() to ignore character casing
  if (country1.TotalDeaths > country2.TotalDeaths) {
    return -1;
  } else if (country1.TotalDeaths < country2.TotalDeaths) {
    return 1;
  }
  return 0;
};

export const tableHeaders = ["Country", "Confirmed", "Recovered", "Death"];

export const getBackgroundColor = (casesKey) => {
  return casesKey === "TotalDeaths"
    ? "rgba(254,0,65)"
    : casesKey === "TotalRecovered"
    ? "rgba(0,166,82)"
    : "rgba(12,69,131)";
};

/**
 *  function to cover number in comma separated format
 * @param {*} x will be number
 */
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const GlobalCasesKey = [
  "TotalConfirmed",
  "TotalRecovered",
  "TotalDeaths",
];
export const GlobalCasesHeading = [
  "Total Confirmed",
  "Total Recovered",
  "Total Deaths",
];

export const chartData = [
  { title: "Confirmed", value: 10, color: "rgba(12,69,131,0.3)" },
  { title: "Recovered", value: 15, color: "rgba(0,166,82,0.3)" },
  { title: "Deaths", value: 20, color: "rgba(254,0,65,0.9)" },
];
