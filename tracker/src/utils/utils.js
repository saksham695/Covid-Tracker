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
