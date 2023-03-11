import axios from "axios";
import { API_REGISTER_SUPPLIER, API_SUPPLIER_MANAGEMENT } from "constant";
import { getHeaders, getHeadersSupplier } from "helpers/utils";
import { store } from "redux/store";
import {
  GET_ALL_SUPPLIER,
  POST_REGISTER_SUPPLIER,
  GET_MY_PROFILE_SUPPLIER_BY_ID,
  PUT_MY_PROFILE_SUPPLIER,
} from "redux/types";

const formatFilter = (filterData) => {
  const filteredFilter = Object.entries(filterData).filter(
    (data) => data[1] !== ""
  );
  const finalFilter = filteredFilter
    .map((data) => `${data[0]}=${data[1]}`)
    .join("|");

  return finalFilter;
};

export const getAllSupplier =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier`,
        method: "GET",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-ORDERBY": "createdDate desc",
          "X-SEARCH": `*${searchQuery}*`,
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  };

export const postRegisterSupplier = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier`,
      method: "post",
      headers: getHeadersSupplier(),
      data,
    });
    dispatch({ type: POST_REGISTER_SUPPLIER, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getMyProfileSupplierbyId = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    dispatch({ type: GET_MY_PROFILE_SUPPLIER_BY_ID, payload: response.data });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const approveSupplier = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier/${id}/approve`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });
    dispatch({ type: PUT_MY_PROFILE_SUPPLIER, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const reviseSupplier = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier/${id}/revise`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });
    dispatch({ type: PUT_MY_PROFILE_SUPPLIER, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const putMyProfileSupplier = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data,
    });
    dispatch({ type: PUT_MY_PROFILE_SUPPLIER, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const exportSupplierListData = (searchQuery) => async (dispatch) => {
  try {
    const header = getHeaders(store.getState().auth.token);

    const response = await axios({
      url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier/ExportExcel`,
      method: "post",
      headers: {
        ...header,
        "X-PAGINATION": true,
        "X-SEARCH": `*${searchQuery}*`,
      },
      responseType: "blob",
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const exportContactPersonListData =
  (searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_SUPPLIER_MANAGEMENT}/api/Supplier/ExportExcel/ContactPerson`,
        method: "post",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-SEARCH": `*${searchQuery}*`,
        },
        responseType: "blob",
      });

      return response;
    } catch (error) {
      return error.response;
    }
  };
