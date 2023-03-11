import axios from "axios";
import { API_WORKFLOW } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";

export const getAllMasterJobList =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `${API_WORKFLOW}/api/Approval/MyTask`,
        method: "GET",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
          "X-ORDERBY": "id desc",
          "X-FILTER": `workflowId!=${process.env.NEXT_PUBLIC_WORKFLOWID_1}|workflowId!=${process.env.NEXT_PUBLIC_WORKFLOWID_2}`,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };
