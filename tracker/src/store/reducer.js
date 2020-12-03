import {
  compareByTotalDeaths,
  compareByTotalDiseased,
  compareByTotalRecovered,
  compareCountry,
} from "../utils/utils";
import { ACTIONS } from "./action";

export const initialState = {
  countryWiseCovidData: [],
  searchedItemList: [],
  globalCases: {},
};

export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTIONS.FILL_DATA:
      return {
        ...state,
        countryWiseCovidData: payload.Countries,
        globalCases: payload.Global,
      };
    case ACTIONS.CONFIRMED: {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareByTotalDiseased),
      };
    }
    case ACTIONS.RECOVERED: {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareByTotalRecovered),
      };
    }
    case ACTIONS.DEATH: {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareByTotalDeaths),
      };
    }
    case ACTIONS.COUNTRY: {
      return {
        ...state,
        countryWiseCovidData: action.payload.sort(compareCountry),
      };
    }
    case ACTIONS.SEARCH_COUNTRY: {
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
