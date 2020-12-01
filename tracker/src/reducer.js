import {
  compareByTotalDeaths,
  compareByTotalDiseased,
  compareByTotalRecovered,
  compareCountry,
} from "./utils/utils";

export const initialState = {
  countryWiseCovidData: [],
  // numberOfConfirmedWiseData: [],
  // numberOfRecoveredWiseData: [],
  // numberOfDeathsWiseData: [],
  globalCases: {},
};

export const reducer = (state, action) => {
  const { payload, type } = action;
  const { Global = {}, Countries = [] } = payload;

  switch (type) {
    case "add":
      return {
        ...state,
        countryWiseCovidData: Countries,
        globalCases: Global,
      };
    case "Confirmed": {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareByTotalDiseased),
      };
    }
    case "Recovered": {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareByTotalRecovered),
      };
    }
    case "Death": {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareByTotalDeaths),
      };
    }
    case "Country": {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareCountry),
      };
    }
    default:
      return {
        ...state,
      };
  }
};
