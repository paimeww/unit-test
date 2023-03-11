import { API_CHANGE_PIC, API_JOB_LIST } from "constant";
import { getHeaders } from "helpers/utils";
import axios from "axios";
import {
  GET_ALL_DOCUMENT_CREATOR_LIST,
  GET_DOCUMENT_APPROVAL,
  POST_CHANGE_PIC,
} from "redux/types";

import { store } from "redux/store";

export const getAllDocumentApprover =
  (pageNumber, pageSize, searchQuery, userName) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_JOB_LIST}/api/Approval/incomplete?userName=${userName}`,
        method: "get",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
          "X-SEARCHFIELD":
            "DocNo|Workflow.SubModuleName|Workflow.ModuleName|Workflow.Status",
        },
      });
      dispatch({ type: GET_DOCUMENT_APPROVAL, payload: response.data });

      return response;
    } catch (error) {
      return error.response;
    }
  };

export const saveChangePIC = (data) => async (dispatch) => {
  try {
    const response = await axios({
      url: `${API_CHANGE_PIC}/api/DocumentPic/change`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data,
    });
    dispatch({ type: POST_CHANGE_PIC, payload: response.data });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAllDocumentCreator =
  (pageNumber, pageSize, searchQuery, userName) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_CHANGE_PIC}/api/DocumentPic/creator`,
        method: "get",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
          "X-SEARCHFIELD": "DocNumber|SubModuleName|ModuleName|DocStatus",
          "X-FILTER": `docCreatedByUserName=${userName}`,
        },
      });
      dispatch({ type: GET_ALL_DOCUMENT_CREATOR_LIST, payload: response.data });

      return response;
    } catch (error) {
      return error.response;
    }
  };
