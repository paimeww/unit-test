import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getAllMailTemplate =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_MASTER_DATA}/api/master/NotificationTemplate`,
        method: "get",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
          "X-SEARCHFIELD": "Name|Subject|Description",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const getMailTemplateByID = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationTemplate/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postMailTemplate = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationTemplate`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const putMailTemplate = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationTemplate/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteMailTemplate = (id) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/NotificationTemplate/${id}`,
      method: "delete",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
