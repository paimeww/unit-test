import React, { useState } from "react";
import { Row, Col, Spinner } from "reactstrap";
import { Input, Label, CustomInput, Button } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { searchFilterListSC } from "redux/middlewares/searchFilterListSC";
import { actionSetFilterListSC } from "redux/actions/suggestionContract/listSC";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import SuccessNotification from "components/Alert/SuccessNotification";
import ErrorNotification from "components/Alert/ErrorNotification";
import { generateRequestNumber } from "helpers/requestForecast";
import InfoNotification from "components/Alert/InfoNotification";
import { Search } from "react-feather";
import FilterSC from "../components/FilterSC";
import { exportExcelSC } from "helpers/suggestionContract";
import moment from "moment";
import { saveAs } from "file-saver";
import { debounce, debounceTwo } from "helpers/utils";

const MySwal = withReactContent(Swal);

const UtilitySuggestionContract = ({
  dataChecklist,
  sessionData,
  userRoles,
  callbackGenerateReqNumber,
  listSC,
}) => {
  const stateFilter = useSelector((state) => state.listSC.filter);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const roleIsNegMgr = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Mgr"
  );

  const roleIsNeSpv = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Spv"
  );

  const isHaveAccess = roleIsNegMgr.length > 0 || roleIsNeSpv.length > 0;

  const showSuccessNotification = (title, desc) => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={`${title ?? ""}`}
          description={`${desc ?? ""}`}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const errorNotification = () => {
    return MySwal.fire({
      position: "center",
      html: (
        <ErrorNotification
          title={"Error"}
          description={
            "Cannot export data to excel please try again several minutes"
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
  };

  const errorNotificationMsg = (title, msg) => {
    return MySwal.fire({
      position: "center",
      html: (
        <ErrorNotification
          title={title}
          description={msg}
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

  const confirmAlert = async () => {
    MySwal.close();
    return MySwal.fire({
      position: "center",
      html: (
        <ConfirmAlert
          onClose={() => {
            MySwal.close();
          }}
          loading={loading}
          onConfirm={() => {
            MySwal.close();
            setLoading(true);
            exportExcelSC(sessionData, stateFilter)
              .then((response) => {
                // saveAs(
                //   response.data,
                //   `SuggestionContract (${moment().format(
                //     "DD/MM/yyy hh:mm:ss"
                //   )}).xlsx`
                // );
                setLoading(false);
                showSuccessNotification(
                  "Information",
                  response.data ?? "Excel Will Be Sent to Your Email"
                );
              })
              .catch((e) => {
                setLoading(false);
                errorNotification();
                console.log(e);
              });
          }}
          newButton={true}
          title={"Export "}
          description={"Are you sure want to export this data ?"}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const confirmAlertGenerateNumber = () => {
    if (
      dataChecklist.filter(
        (el) => el.genericName == "" || el.genericName == null
      ).length > 0
    ) {
      errorNotificationMsg(
        "Info",
        "Cannot generate request number if generic name is empty"
      );
    } else {
      MySwal.close();
      return MySwal.fire({
        position: "center",
        html: (
          <ConfirmAlert
            onClose={() => {
              MySwal.close();
            }}
            onConfirm={async () => {
              MySwal.close();
              setLoading(true);
              await generateRequestNumber(sessionData, dataChecklist);
              callbackGenerateReqNumber();
              setLoading(false);
            }}
            title={"Generate No. Request"}
            description={"Are you sure want to generate request number?"}
            newButton={true}
          />
        ),
        showDenyButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        padding: "0",
        allowOutsideClick: false,
      });
    }
  };

  const searchListSC = (keyword, page) => {
    dispatch(searchFilterListSC(stateFilter?.filter ?? "", keyword, "1"));
  };

  const infoNotification = (name, error) => {
    return MySwal.fire({
      position: "center",
      html: (
        <InfoNotification
          title={name}
          description={error}
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

  return (
    <React.Fragment>
      <br />
      <div className="col-12 p-0 m-0">
        <Row className="col-12 p-0 m-0">
          <div className="col-md-6 col-12 row p-0 m-0">
            <h2 className="">Suggestion Contract</h2>
          </div>
          <div className="row col-12 col-md-6 d-flex justify-content-end align-items-end p-0 m-0 mt-sm-2 mt-md-0">
            {isHaveAccess && !loading && (
              <Button.Ripple
                onClick={() => {
                  if (dataChecklist.length > 0) {
                    confirmAlertGenerateNumber();
                  } else {
                    infoNotification(
                      "Info",
                      "Please checklist data at least 1 data from table"
                    );
                  }
                }}
                color="success"
                className="px-2 mt-2 mt-sm-0 mr-sm-2 mr-0 col-12 col-sm-auto"
              >
                Generate No. Request
              </Button.Ripple>
            )}
            {!loading && (
              <Button.Ripple
                onClick={() => confirmAlert()}
                color="success"
                className="px-2 mt-2 mt-sm-0 col-12 col-sm-auto"
              >
                Export
              </Button.Ripple>
            )}
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
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Button.Ripple>
            )}
          </div>
        </Row>
      </div>
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
                  actionSetFilterListSC({
                    GenericName: stateFilter?.GenericName ?? "",
                    ItemDescription: stateFilter?.ItemDescription ?? "",
                    ItemCode: stateFilter?.ItemCode ?? "",
                    Manufacture: stateFilter?.Manufacture ?? "",
                    totalShow: value.target.value ?? "5",
                    filter: stateFilter?.filter ?? "",
                    keyword: stateFilter?.keyword ?? "",
                    page: "1",
                  })
                );
                searchListSC(stateFilter?.keyword ?? "", "1");
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
            <FilterSC listSC={listSC} />
          </div>
          <Input
            className="search-table2 mt-1"
            type="text"
            name="search"
            id="search-invoice"
            placeholder="Search"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchListSC(`*${e.target.value}*`, "1");
              }
            }}
            onChange={(e) => {
              debounceTwo(() => {
                dispatch(
                  actionSetFilterListSC({
                    GenericName: stateFilter?.GenericName ?? "",
                    ItemDescription: stateFilter?.ItemDescription ?? "",
                    ItemCode: stateFilter?.ItemCode ?? "",
                    Manufacture: stateFilter?.Manufacture ?? "",
                    totalShow: stateFilter?.totalShow ?? "5",
                    filter: stateFilter?.filter ?? "",
                    keyword: `*${e.target.value}*`,
                    page: "1",
                  })
                );
                searchListSC(`*${e.target.value}*`, "1");
              }, 2000);
            }}
          />
          <Search size={20} style={{ marginLeft: "-30px" }} className="mt-1" />
          <div className="mt-1 ml-1 pl-1 d-md-none d-block">
            <FilterSC listSC={listSC} />
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default React.memo(UtilitySuggestionContract);
