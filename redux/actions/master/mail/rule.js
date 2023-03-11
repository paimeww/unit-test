import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getAllMailRule =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_MASTER_DATA}/api/master/NotificationRule`,
        method: "get",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const getMailRuleByID = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationRule/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMailRule = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationRule`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const putMailRule = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationRule/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMailRule = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationRule/${id}`,
      method: "delete",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
