import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getAllMasterScoring =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_MASTER_DATA}/api/master/Scoring`,
        method: "get",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
          "X-ORDERBY": "Performance asc",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const getMasterScoringByID = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Scoring/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMasterScoring = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Scoring`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const putMasterScoring = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Scoring/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMasterScoring = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Scoring/${id}`,
      method: "delete",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
