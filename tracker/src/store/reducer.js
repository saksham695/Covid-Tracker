import {
  compareByTotalDeaths,
  compareByTotalDiseased,
  compareByTotalRecovered,
  compareCountry,
} from "../utils/utils";

export const initialState = {
  countryWiseCovidData: [],
  searchedItemList: [],
  globalCases: {},
};

export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "add":
      return {
        ...state,
        countryWiseCovidData: payload.Countries,
        globalCases: payload.Global,
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
    case "Search": {
      return {
        ...state,
        searchedItemList:
          payload.length &&
          state.countryWiseCovidData.filter((item) =>
            item.Country.toUpperCase().includes(payload)
          ),
      };
    }
    default:
      return {
        ...state,
      };
  }
};
