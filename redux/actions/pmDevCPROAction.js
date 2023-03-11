import axios from 'axios';
import {
	GET_ALL_CPRO_PM_DEV,
	GET_CPRO_PM_DEV_BY_ID,
} from "redux/types"
import { getHeaders } from 'helpers/utils';
import { store } from "redux/store"

// export const getAllPMDevCPRO = (pageSize, pageNumber, searchQuery, token) => async () => {
// 	try {
// 		const header = getHeaders(token);
// 		const response = await axios.get('http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest', {
// 			headers: {
// 				...header,
// 				'X-PAGINATION': true,
// 				'X-PAGE': pageNumber,
// 				'X-PAGESIZE': pageSize,
// 				'X-SEARCH': '' + searchQuery + '',
// 			},
// 		});

// 		return response.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const getAllPMDevCPRO =
  (pageNumber, pageSize, searchQuery) => async (dispatch) => {
    try {
      const header = getHeaders(store.getState().auth.token);

      const response = await axios({
        url: `http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest`,
        method: "GET",
        headers: {
          ...header,
          "X-PAGINATION": true,
          "X-PAGE": pageNumber,
          "X-PAGESIZE": pageSize,
          "X-SEARCH": `*${searchQuery}*`,
        },
      });

      console.log(response, "respact");
      dispatch({
        type: GET_ALL_CPRO_PM_DEV,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

// export const getPMDevCPROByID = (id, token) => async () => {
// 	try {
// 		const response = await axios.get(`http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest/${id}`, {
// 			headers: getHeaders(token),
// 		});

// 		return response.data;
// 	} catch (error) {
// 		return error.response;
// 	}
// };

export const getPMDevCPROByID = (id) => async (dispatch) => {
	try {
	  const response = await axios({
		url: `http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest/${id}`,
		method: "GET",
		headers: getHeaders(store.getState().auth.token),
	  });
	  dispatch({
		type: GET_CPRO_PM_DEV_BY_ID,
		payload: response.data,
	  });
	} catch (error) {
	  console.log(error);
	}
  };