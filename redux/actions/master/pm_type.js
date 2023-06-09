import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import {
  DELETE_MASTER_PM_TYPE,
  GET_ALL_MASTER_PM_TYPE,
  GET_MASTER_PM_TYPE_BY_ID,
  POST_MASTER_PM_TYPE,
  PUT_MASTER_PM_TYPE,
  GET_MATERIAL_TYPE,
} from "redux/types";

export const getAllMasterPMType =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_MASTER_DATA}/api/master/PmType`,
        method: "GET",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
        },
      });

      dispatch({ type: GET_ALL_MASTER_PM_TYPE, payload: response.data });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const getMasterPMTypeByID = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/PmType/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addMasterPMType = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/PmType`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateMasterPMType = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/PmType/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data,
    });
    dispatch({ type: PUT_MASTER_PM_TYPE, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMasterPMType = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/PmType/${id}`,
      method: "delete",
      headers: getHeaders(store.getState().auth.token),
    });
    dispatch({ type: DELETE_MASTER_PM_TYPE, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};
