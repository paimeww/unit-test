import {
  GET_ALL_MASTER_CLUSTERING_DOCUMENT,
} from "redux/types";

const initialState = {
  data: [],
  currentPage: 0,
  pageSize: 0,
  totalPage: 0,
};

const masterClusteringDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MASTER_CLUSTERING_DOCUMENT:
      return {
        ...state,
        data: action.payload.data,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default masterClusteringDocumentReducer;
