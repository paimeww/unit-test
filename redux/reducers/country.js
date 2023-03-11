import {
  GET_ALL_MASTER_COUNTRY,
} from "redux/types";

const initialState = {
  searchList: [],
  individualData: {},
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MASTER_COUNTRY:
      let tempCountry = [];
      action.payload.data.map((data) => {
        tempCountry.push({
          value: data.name,
          label: data.name,
        });
      });

      return {
        ...state,
        searchList: tempCountry,
      };
    default:
      return state;
  }
};

export default countryReducer;
