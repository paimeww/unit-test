import {
    GET_ALL_CPRO_PM_DEV,
    GET_CPRO_PM_DEV_BY_ID,
    DELETE_CPRO_PM_DEV,
    POST_CPRO_PM_DEV,
    PUT_CPRO_PM_DEV,
  } from "redux/types";
  
  const initialState = {
    data: [],
    currentPage: 0,
    pageSize: 0,
    totalPage: 0,
  };
  
  const pmDevCproReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_CPRO_PM_DEV:
        return {
          ...state,
          data: action.payload.data,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalPage: action.payload.totalPage,
        };
      case GET_CPRO_PM_DEV_BY_ID:
        return action.payload;
      case DELETE_CPRO_PM_DEV:
        return action.payload;
      case POST_CPRO_PM_DEV:
        return action.payload;
      case PUT_CPRO_PM_DEV:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default pmDevCproReducer;
  