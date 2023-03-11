import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import {
  DELETE_MASTER_MATERIAL_CODE,
  GET_ALL_MASTER_MATERIAL_CODE,
  GET_MASTER_MATERIAL_CODE_BY_ID,
  POST_MASTER_MATERIAL_CODE,
  PUT_MASTER_MATERIAL_CODE,
} from "redux/types";

export const getAllMasterMaterialCode = () => async (dispatch) => {
  try {
    const header = getHeaders(store.getState().auth.token);

    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/InfoForMaterialCode`,
      method: "GET",
      headers: {
        ...header,
        "X-PAGINATION": true,
        "X-PAGE": 1,
        "X-PAGESIZE": 1,
        "X-ORDERBY": "id desc",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getMasterMaterialCodeByID = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/InfoForMaterialCode/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    return response
  } catch (error) {
    console.log(error);
  }
};

export const addMasterMaterialCode = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/InfoForMaterialCode`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateMasterMaterialCode = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/InfoForMaterialCode/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data,
    });
    dispatch({ type: PUT_MASTER_MATERIAL_CODE, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMasterMaterialCode = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/InfoForMaterialCode/${id}`,
      method: "delete",
      headers: getHeaders(store.getState().auth.token),
    });
    dispatch({ type: DELETE_MASTER_MATERIAL_CODE, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};
