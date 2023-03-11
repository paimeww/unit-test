import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import { GET_ALL_MASTER_COUNTRY } from "redux/types";

export const getAllMasterCountry =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_MASTER_DATA}/api/master/Country`,
        method: "GET",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
          "X-ORDERBY": `code asc`,
        },
      });

      dispatch({ type: GET_ALL_MASTER_COUNTRY, payload: response.data });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const getMasterCountryByID = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Country/${id}`,
      method: "GET",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMasterCountry = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Country`,
      method: "POST",
      headers: getHeaders(store.getState().auth.token),

      data: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const putMasterCountry = (data, id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Country/${id}`,
      method: "PUT",
      headers: getHeaders(store.getState().auth.token),
      data: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMasterCountry = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/Country/${id}`,
      method: "DELETE",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
