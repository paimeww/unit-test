import axios from "axios";
import { API_MASTER_DATA } from "constant";
import { getHeaders } from "helpers/utils";
import { store } from "redux/store";
import { NEXT_PPCR_FORM, SUBMIT_PPCR_FORM, RESET_PPCR } from "redux/types";

export const nextPageForm = (
  project,
  terimaFaToTurunFa,
  turunFaTerimaPrintOut,
  turunFaApproveFps,
  turunFaAnalisa,
  turunFaTotal
) => {
  return {
    type: NEXT_PPCR_FORM,
    project: project,
    terimaFaToTurunFa: terimaFaToTurunFa,
    turunFaTerimaPrintOut: turunFaTerimaPrintOut,
    turunFaApproveFps: turunFaApproveFps,
    turunFaAnalisa: turunFaAnalisa,
    turunFaTotal: turunFaTotal,
  };
};

export const submitFormPPCR = (
  printOutTerimaPpcr,
  printOutApproveFps,
  printOutAnalisa,
  printOutTotal,
  turunFaToPpcr,
  ppcrToBarangDatang,
  grandTotal
) => {
  return {
    type: SUBMIT_PPCR_FORM,
    printOutTerimaPpcr: printOutTerimaPpcr,
    printOutApproveFps: printOutApproveFps,
    printOutAnalisa: printOutAnalisa,
    printOutTotal: printOutTotal,
    turunFaToPpcr: turunFaToPpcr,
    ppcrToBarangDatang: ppcrToBarangDatang,
    grandTotal: grandTotal,
  };
};

export const getAllLTPPCR = (pageSize, pageNumber, searchQuery) => async () => {
  try {
    const header = getHeaders(store.getState().auth.token);

    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/TargetLeadTimePpcr`,
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

export const fetchPpcrDataById = (id) => async () => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/TargetLeadTimePpcr/${id}`,
      method: "get",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const addPpcrData = (data) => async () => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/TargetLeadTimePpcr`,
      method: "post",
      headers: getHeaders(store.getState().auth.token),
      data: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const updatePpcrData = (data, id) => async () => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/TargetLeadTimePpcr/${id}`,
      method: "put",
      headers: getHeaders(store.getState().auth.token),
      data: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const deletePpcrData = (id) => async () => {
  try {
    const response = await axios({
      url: `${API_MASTER_DATA}/api/master/TargetLeadTimePpcr/${id}`,
      method: "delete",
      headers: getHeaders(store.getState().auth.token),
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const resetDataPpcr = () => {
  return {
    type: RESET_PPCR,
  };
};
