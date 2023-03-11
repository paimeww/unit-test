import React, { useState } from "react";
import { Row, Col, Spinner } from "reactstrap";
import { Input, Label, CustomInput, Button } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReviseReasonSubmit from "components/Alert/ReviseReasonSubmit";
import { useDispatch, useSelector } from "react-redux";
import { searchFilterListFC } from "redux/middlewares/searchFilterListFC";
import { actionSetFilterListFC } from "redux/actions/forecastCalculation/index";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import {
  approveFC,
  exportExcelFC,
  updateForUploadExcel,
} from "helpers/forecastCalculation";
import SuccessNotification from "components/Alert/SuccessNotification";
import ErrorNotification from "components/Alert/ErrorNotification";
import { read, utils } from "xlsx";
import InfoNotification from "components/Alert/InfoNotification";
import FilterFC from "../components/FilterFC";
import { Search } from "react-feather";
import moment from "moment";
import { saveAs } from "file-saver";
import { debounce, debounceTwo } from "helpers/utils";

const MySwal = withReactContent(Swal);

const UtilityFC = ({
  sessionData,
  isCheck,
  isCheckAll,
  listFC,
  userRoles,
  callbackChecklist,
}) => {
  const stateFilter = useSelector((state) => state.listFC.filter);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);

  const roleIsMPSvr = (userRoles ?? []).filter(
    (element) => element.role.name == "Material Planner Spv"
  );
  const roleIsMPMgr = (userRoles ?? []).filter(
    (element) => element.role.name == "Material Planner Mgr"
  );
  const roleIsMPSrMgr = (userRoles ?? []).filter(
    (element) => element.role.name == "Material Planner Sr. Mgr"
  );

  const isCanUpload =
    roleIsMPSvr.length > 0 &&
    roleIsMPMgr.length == 0 &&
    roleIsMPSrMgr.length == 0;

  const isCanPosting =
    roleIsMPSvr.length > 0 &&
    roleIsMPMgr.length == 0 &&
    roleIsMPSrMgr.length == 0;

  const isCanSubmit =
    roleIsMPSvr.length == 0 &&
    roleIsMPMgr.length > 0 &&
    roleIsMPSrMgr.length == 0;

  const isCanApprove =
    roleIsMPSvr.length == 0 &&
    roleIsMPMgr.length == 0 &&
    roleIsMPSrMgr.length > 0;

  const isAllCanAccess = isCanPosting || isCanSubmit || isCanApprove;

  const isCanReturn = isCanSubmit || isCanApprove;

  const showSuccessNotification = (msg, title) => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={title ?? "Success"}
          description={msg}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const errorNotification = (text) => {
    return MySwal.fire({
      position: "center",
      html: (
        <ErrorNotification
          title={"Error"}
          description={`${text ?? "Failed proccess data"}`}
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const showConfirmRevise = () => {
    const body = isCheckAll ? listFC : isCheck;
    const newBody = [];
    if (body.length == 0) {
      setLoading(false);
      return infoNotification(
        "Info",
        "Please select data for return at least one data"
      );
    }
    return MySwal.fire({
      position: "center",
      html: (
        <ReviseReasonSubmit
          title="Return"
          onConfirm={(noteRevise) => {
            MySwal.close();
            setLoading(true);
            if (body.length > 0) {
              body.map((item, index) => {
                item.returnReason = noteRevise;
                newBody = [...newBody, item];
              });

              approveFC(sessionData.user.token, "revise", newBody)
                .then((response) => {
                  if (response) {
                    setLoading(false);
                    searchListFC();
                    showSuccessNotification(`Success`, "Return");
                    callbackChecklist();
                  } else {
                    setLoading(false);
                  }
                })
                .catch((e) => {
                  setLoading(false);
                  errorNotification();
                });
            } else {
              setLoading(false);
              infoNotification(
                "Info",
                "Please select data for return at least one data"
              );
            }
          }}
          onClose={() => {
            MySwal.close();
          }}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const confirmAlert = () => {
    MySwal.close();
    if (isCheck.length > 0) {
      return MySwal.fire({
        position: "center",
        html: (
          <ConfirmAlert
            onClose={() => {
              MySwal.close();
            }}
            onConfirm={() => {
              MySwal.close();
              setLoading(true);
              const body = isCheckAll ? listFC : isCheck;
              exportExcelFC(
                sessionData.user.token,
                sessionData.user,
                body,
                stateFilter
              )
                .then((response) => {
                  saveAs(
                    response.data,
                    `ForecastCalculation (${moment().format(
                      "DD/MM/yyy hh:mm:ss"
                    )}).xlsx`
                  );
                  setLoading(false);
                  showSuccessNotification("Success", "Download");
                  callbackChecklist();
                })
                .catch((e) => {
                  setLoading(false);
                  errorNotification();
                });
            }}
            title={"Download"}
            description={"Are you sure want to download this data?"}
            newButton={true}
          />
        ),
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        padding: "0",
        allowOutsideClick: false,
      });
    } else {
      infoNotification(
        "Document Validation",
        "Please select at least one request number."
      );
    }
  };

  const infoNotification = (name, errorMsg) => {
    return MySwal.fire({
      position: "center",
      html: (
        <InfoNotification
          title={name}
          description={errorMsg}
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const confirmUpdateStatusAlert = (action) => {
    MySwal.close();
    let label = action == "submit" ? "posting" : "approve";
    return MySwal.fire({
      position: "center",
      html: (
        <ConfirmAlert
          onClose={() => {
            setLoading(false);
            MySwal.close();
          }}
          onConfirm={() => {
            setLoading(true);
            const body = isCheckAll ? listFC : isCheck;
            const filterNotWaitingApprove = body.filter(
              (element) => element.status != "Waiting Approval"
            );

            const filterNotDraftOrRevise = body.filter(
              (element) =>
                element.status != "Draft" && element.status != "Revised"
            );

            if (action == "submit") {
              MySwal.close();
              if (body.length > 0) {
                if (filterNotDraftOrRevise.length > 0) {
                  setLoading(false);
                  return infoNotification(
                    "Info",
                    "You must be selected all data with status draft or revise"
                  );
                }
                approveFC(sessionData.user.token, action, body)
                  .then((response) => {
                    if (response) {
                      setLoading(false);
                      searchListFC();
                      showSuccessNotification(
                        `Success`,
                        action == "submit" ? "Posting" : "approve"
                      );
                      callbackChecklist();
                    } else {
                      setLoading(false);
                    }
                  })
                  .catch((e) => {
                    console.log(e.message);
                    setLoading(false);
                    errorNotification();
                  });
              } else {
                setLoading(false);
                infoNotification(
                  "Info",
                  "please select at least one data to proccess"
                );
              }
            } else {
              MySwal.close();
              if (body.length > 0) {
                if (filterNotWaitingApprove.length > 0) {
                  setLoading(false);
                  return infoNotification(
                    "Info",
                    "You must be selected all data with status waiting approval"
                  );
                }
                const filterRequestNumber = listFC.filter(
                  (element) => element.requestNumber == body[0].requestNumber
                );
                const filterNotRequestNumber = body.filter(
                  (element) => element.requestNumber != body[0].requestNumber
                );

                if (filterNotRequestNumber.length > 0) {
                  setLoading(false);
                  infoNotification(
                    "Info",
                    "You have selected two different number request,  please just select single number request to proccess"
                  );
                } else {
                  if (body.length < filterRequestNumber.length) {
                    setLoading(false);
                    infoNotification(
                      "Info",
                      "You must be sellect all data with same number request"
                    );
                  } else {
                    MySwal.close();
                    approveFC(sessionData.user.token, action, body)
                      .then((response) => {
                        if (response) {
                          setLoading(false);
                          searchListFC();
                          showSuccessNotification(
                            `Success`,
                            action == "submit" ? "posting" : "approve"
                          );
                          callbackChecklist();
                        } else {
                          setLoading(false);
                        }
                      })
                      .catch((e) => {
                        console.log(e.message);
                        setLoading(false);
                        errorNotification();
                      });
                  }
                }
              } else {
                setLoading(false);
                infoNotification(
                  "Info",
                  "please select at least one data to proccess"
                );
              }
            }
          }}
          title={action == "submit" ? "Posting" : "Approve"}
          description={`Are you sure want to ${action} this data?`}
          newButton={true}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const confirmUpdateStatusWithoutValidateAlert = (action) => {
    MySwal.close();
    return MySwal.fire({
      position: "center",
      html: (
        <ConfirmAlert
          onClose={() => {
            setLoading(false);
            MySwal.close();
          }}
          onConfirm={() => {
            setLoading(true);
            const body = isCheckAll ? listFC : isCheck;
            const filterNotPosting = body.filter(
              (element) => element.status != "Posting"
            );

            if (body.length > 0) {
              MySwal.close();
              if (filterNotPosting.length > 0) {
                setLoading(false);
                return infoNotification(
                  "Info",
                  "You must be selected all data with status posting"
                );
              }
              approveFC(sessionData.user.token, action, body)
                .then((response) => {
                  if (response) {
                    setLoading(false);
                    searchListFC();
                    showSuccessNotification(`Success`, "Submit");
                    callbackChecklist();
                  } else {
                    setLoading(false);
                  }
                })
                .catch((e) => {
                  setLoading(false);
                  errorNotification();
                });
            } else {
              setLoading(false);
              infoNotification(
                "Info",
                "Please select at least one data to proccess"
              );
            }
          }}
          title={"Submit"}
          description={`Are you sure want to ${action} this data?`}
          newButton={true}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const searchListFC = () => {
    dispatch(
      searchFilterListFC(sessionData, userRoles, stateFilter?.filter ?? "")
    );
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = utils.sheet_to_json(worksheet);

          var generateDataExcel = [];

          var dataIsValid = true;

          json.map((item, index) => {
            Object.keys(item).forEach((key) => {
              if (
                key == "History Receiving Y2" ||
                key == "History Receiving Y1" ||
                key == "History Receiving Ytd" ||
                key == "History Use Y2" ||
                key == "History Use Y1" ||
                key == "History Use Ytd" ||
                key == "Contract Qty"
              ) {
                if (isNaN(item[key])) {
                  setLoading(false);
                  dataIsValid = false;
                  return MySwal.fire({
                    position: "center",
                    html: (
                      <ErrorNotification
                        title={"Error"}
                        description={
                          "Value form " +
                          key +
                          " must be number but current value set with '" +
                          item[key] +
                          "'"
                        }
                        onClose={() => MySwal.close()}
                        onConfirm={() => MySwal.close()}
                      />
                    ),
                    showDenyButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    padding: "0",
                    allowOutsideClick: false,
                  });
                }
              }
            });

            var bodyTemplate = {
              requestNumber: item["Request Number"],
              genericName: item["Generic Name"],
              site: item["Site"],
              manufacturer: item["Manufacturer"],
              itemCode: item["Item"],
              itemDescription: item["Item Description"],
              historyReceivingY2: parseFloat(item["History Receiving Y2"]),
              historyReceivingY1: parseFloat(item["History Receiving Y1"]),
              historyReceivingYTD: parseFloat(item["History Receiving Ytd"]),
              historyUseY2: parseFloat(item["History Use Y2"]),
              historyUseY1: parseFloat(item["History Use Y1"]),
              historyUseYTD: parseFloat(item["History Use Ytd"]),
              requestDate: item["Request Date"],
              periodeStart: item["Periode Start"],
              periodeEnd: item["Periode End"],
              contractQty: parseFloat(item["Contract Qty"]),
              uom: item["UOM"],
              status: "",
              note: item["Note"],
              returnReason: item["Return Reason"],
              orgCode: item["Org Code"],
              sbu: "",
              mfg: "",
              kelompokMaterial: "",
              isRoutine: "",
            };

            generateDataExcel = [...generateDataExcel, bodyTemplate];
          });

          if (dataIsValid) {
            updateForUploadExcel(sessionData.user.token, generateDataExcel)
              .then(() => {
                setLoading(false);
                searchListFC();
                showSuccessNotification("Success", "Upload");
              })
              .catch((e) => {
                setLoading(false);
                errorNotification();
              });
          }
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Col className="no-gutters p-0 m-0" xl="12" md="12" sm="12">
        <Row className="d-flex no-gutters justify-content-between align-items-end">
          <h2 className="">Forecast Calculation</h2>
        </Row>
      </Col>
      <Row className="mt-2 d-flex align-items-center justify-content-between mr-0">
        {loading && (
          <Button.Ripple
            color="success"
            className="px-2 mt-2 mt-sm-0 col-12 col-sm-auto"
          >
            <Spinner
              animation="border"
              role="status"
              size="sm"
              color="white"
            ></Spinner>
          </Button.Ripple>
        )}
        {!loading && (
          <div className="row mr-0 no-gutters p-0 m-0 col-sm-12 col-md-auto pl-1 pl-sm-1">
            {isAllCanAccess && (
              <div className="mr-md-2 col-12 col-sm-4 mt-2 pr-sm-2 col-md-auto pr-md-0">
                <Button.Ripple
                  onClick={() => confirmAlert()}
                  color="info"
                  className="col-12 col-md-auto px-md-3"
                >
                  Download
                </Button.Ripple>
              </div>
            )}
            {isCanUpload && (
              <div className="mr-md-2 col-12 col-sm-4 mt-2 px-sm-1 col-md-auto px-md-0">
                <Button.Ripple
                  onClick={() => {
                    hiddenFileInput.current.click();
                  }}
                  color="warning"
                  className="col-12 col-md-auto px-md-3"
                >
                  Upload
                </Button.Ripple>
                <form>
                  <input
                    type="file"
                    name="upload"
                    ref={hiddenFileInput}
                    id="upload"
                    style={{ display: "none" }}
                    onChange={readUploadFile}
                  />
                </form>
              </div>
            )}
            {isCanReturn && (
              <div className="mr-md-2 col-12 col-sm-4 mt-2 px-sm-1 col-md-auto px-md-0">
                <Button.Ripple
                  onClick={() => showConfirmRevise()}
                  color="warning"
                  className="col-12 col-md-auto px-md-3"
                >
                  Return
                </Button.Ripple>
              </div>
            )}
            {isCanPosting && (
              <div className="col-12 col-sm-4 mt-2 pl-sm-2 col-md-auto pl-md-0">
                <Button.Ripple
                  onClick={() => confirmUpdateStatusAlert("submit")}
                  color="success"
                  className="col-12 col-md-auto px-md-3"
                >
                  Posting
                </Button.Ripple>
              </div>
            )}
            {isCanSubmit && (
              <div className="col-12 col-sm-4 mt-2 pl-sm-2 col-md-auto pl-md-0">
                <Button.Ripple
                  onClick={() =>
                    confirmUpdateStatusWithoutValidateAlert("approve")
                  }
                  color="success"
                  className="col-12 col-md-auto px-md-3"
                >
                  Submit
                </Button.Ripple>
              </div>
            )}
            {/* <div className="col-12 col-sm-4 mt-2 pl-sm-2 col-md-auto pl-md-0">
              <Button.Ripple
                onClick={() =>
                  confirmUpdateStatusWithoutValidateAlert("approve")
                }
                color="success"
                className="col-12 col-md-auto px-md-3"
              >
                Submit
              </Button.Ripple>
            </div> */}
            {isCanApprove && (
              <div className="col-12 col-sm-4 mt-2 pl-sm-2 col-md-auto pl-md-0">
                <Button.Ripple
                  onClick={() => confirmUpdateStatusAlert("approve")}
                  color="success"
                  className="col-12 col-md-auto px-md-3"
                >
                  Approve
                </Button.Ripple>
              </div>
            )}
          </div>
        )}
      </Row>
      <div className="d-flex justify-content-between align-items-center mb-0 mt-1">
        <div className="d-flex align-items-center mr-2 mt-md-1">
          <div style={{ marginTop: 5 }} className="mt-sm-1 mt-md-0">
            <Label className="mr-1" for="search-input-1">
              Show
            </Label>
            <CustomInput
              id="show"
              type="select"
              className="custominput-table2 border-1"
              value={stateFilter?.totalShow ?? "5"}
              onChange={(value) => {
                dispatch(
                  actionSetFilterListFC({
                    GenericName: stateFilter?.GenericName ?? "",
                    ItemDescription: stateFilter?.ItemDescription ?? "",
                    ItemCode: stateFilter?.ItemCode ?? "",
                    RequestNumber: stateFilter?.RequestNumber ?? "",
                    Site: stateFilter?.Site ?? "",
                    totalShow: value.target.value ?? "5",
                    filter: stateFilter?.filter ?? "",
                    keyword: stateFilter?.keyword ?? "",
                    page: "1",
                  })
                );
                searchListFC();
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
          </div>
        </div>
        <Col
          className="d-flex align-items-center justify-content-center mt-1 mt-sm-0 mr-0 pr-0 pr-md-1 mt-md-0"
          xl="4"
          md="5"
          sm="6"
        >
          <div className="mt-1 ml-1 pr-1 d-md-block d-none">
            <FilterFC sessionData={sessionData} userRoles={userRoles} />
          </div>
          <Input
            className="search-table2 mt-1"
            type="text"
            name="search"
            id="search-invoice"
            placeholder="Search"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchListFC();
              }
            }}
            onChange={(e) => {
              debounceTwo(() => {
                dispatch(
                  actionSetFilterListFC({
                    GenericName: stateFilter?.GenericName ?? "",
                    ItemDescription: stateFilter?.ItemDescription ?? "",
                    ItemCode: stateFilter?.ItemCode ?? "",
                    RequestNumber: stateFilter?.RequestNumber ?? "",
                    Site: stateFilter?.Site ?? "",
                    totalShow: stateFilter?.totalShow ?? "5",
                    filter: stateFilter?.filter ?? "",
                    keyword: `*${e.target.value}*`,
                    page: "1",
                  })
                );
                searchListFC();
              }, 2000);
            }}
          />
          <Search size={20} style={{ marginLeft: "-30px" }} className="mt-1" />
          <div className="mt-1 ml-1 pl-1 d-md-none d-block">
            <FilterFC sessionData={sessionData} userRoles={userRoles} />
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default React.memo(UtilityFC);
