import axios from 'axios';
import { getHeaders } from 'helpers/utils';

export const fetchPPICData = (pageSize, pageNumber, searchQuery, sortField, token) => async () => {
	try {
		const header = getHeaders(token);
		const response = await axios.get('http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest', {
			headers: {
				...header,
				'X-PAGINATION': true,
				'X-PAGE': pageNumber,
				'X-PAGESIZE': pageSize,
				'X-SEARCH': '*' + searchQuery + '*',
				'X-ORDERBY': `${sortField}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchPPICDataById = (id, token) => async () => {
	try {
		const response = await axios.get(`http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest/${id}`, {
			headers: getHeaders(token),
		});

		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const savePPICData = (data, id, token) => async () => {
	try {
		const response = await axios({
			url: `http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest/${id}`,
			method: 'put',
			headers: getHeaders(token),
			data: data,
		});

		return response;
	} catch (error) {
		return error.response;
	}
};

export const submitPPICData = (id, token) => async () => {
	try {
		const response = await axios({
			url: `http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest/submit/${id}`,
			method: 'post',
			headers: getHeaders(token),
		});

		return response;
	} catch (error) {
		return error.response;
	}
};

export const exportExcelPMDevList = (searchQuery, token) => async () => {
	try {
		const header = getHeaders(token);

		const response = await axios({
			url: 'http://kpartner-pmdevrequest-development-kf-asd-kpartner-dev.apps.alpha.kalbe.co.id/api/PMDevRequest/ExportExcel',
			method: 'post',
			headers: {
				...header,
				'X-PAGINATION': true,
				'X-SEARCH': `*${searchQuery}*`,
				'X-SEARCHFIELD': `pmDevNo|faSpecNo|materialCode|materialName|pmType|createdByName|createdDate|site|statusText`,
			},
			responseType: 'blob',
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};
