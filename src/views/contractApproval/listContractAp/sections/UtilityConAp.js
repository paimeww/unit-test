import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spinner } from "reactstrap";
import { Input, Label, CustomInput, Button } from "reactstrap";
import { getListContractApproval } from "redux/middlewares/getListContractApproval";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import ErrorNotification from "components/Alert/ErrorNotification";
import SuccessNotification from "components/Alert/SuccessNotification";
import { exportExcelCA } from "helpers/contractApproval";
import FilterLCA from "../components/FilterLCA";
import { Search } from "react-feather";
import { actionSetFilterContractApproval } from "redux/actions/contractApproval";
import { getPermissionComponent } from "helpers/getPermission";
import moment from "moment";
import { saveAs } from "file-saver";
import { debounce, debounceTwo } from "helpers/utils";
const MySwal = withReactContent(Swal);

const UtilityConAp = ({ sessionData, userRoles }) => {
  const stateFilter = useSelector((state) => state.contractApproval.filter);
  const [loading, setLoading] = useState(false);
  const [canAccess, setCanAccess] = useState(false);
  const dispatch = useDispatch();
  const searchContractApproval = () => {
    dispatch(getListContractApproval(sessionData, userRoles));
  };

  useEffect(() => {
    setCanAccess(getPermissionComponent(["Nego Spv", "Nego Mgr"]));
    return () => {};
  }, []);

  const errorNotification = (msg) => {
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

  const showSuccessNotification = () => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={"Success"}
          description={
            "Export data to excel has success, please check your email for download file"
          }
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const [loadingExcel, setLoadingExcel] = useState(false);

  const confirmAlert = () => {
    MySwal.close();
    return MySwal.fire({
      position: "center",
      html: (
        <ConfirmAlert
          onClose={() => {
            MySwal.close();
          }}
          onConfirm={() => {
            MySwal.close();
            setLoadingExcel(true);
            exportExcelCA(sessionData, stateFilter)
              .then((response) => {
                if (response) {
                  saveAs(
                    response.data,
                    `ContractApproval (${moment().format(
                      "DD/MM/yyy hh:mm:ss"
                    )}).xlsx`
                  );
                  setLoadingExcel(false);
                  showSuccessNotification();
                } else {
                  setLoadingExcel(false);
                }
              })
              .catch((e) => {
                setLoadingExcel(false);
                errorNotification(e.message.toString());
              });
          }}
          title={"Export "}
          description={"Are you sure want to export this data ?"}
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

  return (
    <React.Fragment>
      <Col className="no-gutters p-0 m-0" xl="12" md="12" sm="12">
        <Row className="d-flex no-gutters justify-content-between align-items-end">
          <h2 className="">Monitoring Contract Approval</h2>
          <div className="row mr-0 no-gutters p-0 m-0 col-sm-12 col-md-auto">
            <div className="col-12 col-sm-4 mt-2 pl-sm-2 col-md-auto pl-md-0">
              {canAccess && !loadingExcel && (
                <Button
                  onClick={() => confirmAlert()}
                  color="success"
                  className="col-12 col-md-auto px-md-3"
                >
                  Export To Excel
                </Button>
              )}

              {loadingExcel && (
                <div className="row px-1 mb-1">
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
                </div>
              )}
            </div>
          </div>
        </Row>
      </Col>
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
                  actionSetFilterContractApproval({
                    ContractNumber: stateFilter?.ContractNumber ?? "",
                    RequestNumber: stateFilter?.RequestNumber ?? "",
                    GenericName: stateFilter?.GenericName ?? "",
                    Manufacturer: stateFilter?.Manufacturer ?? "",
                    VendorName: stateFilter?.VendorName ?? "",
                    Status: stateFilter?.Status ?? "",
                    StatusContract: stateFilter?.StatusContract ?? "",
                    totalShow: value.target.value ?? "5",
                    filter: stateFilter?.filter ?? "",
                    keyword: stateFilter?.keyword ?? "",
                    page: "1",
                  })
                );
                searchContractApproval();
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
            <FilterLCA sessionData={sessionData} userRoles={userRoles} />
          </div>
          <Input
            className="search-table2 mt-1"
            type="text"
            name="search"
            id="search-invoice"
            placeholder="Search"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchContractApproval();
              }
            }}
            onChange={(e) => {
              debounceTwo(() => {
                dispatch(
                  actionSetFilterContractApproval({
                    ContractNumber: stateFilter?.ContractNumber ?? "",
                    RequestNumber: stateFilter?.RequestNumber ?? "",
                    GenericName: stateFilter?.GenericName ?? "",
                    Manufacturer: stateFilter?.Manufacturer ?? "",
                    VendorName: stateFilter?.VendorName ?? "",
                    Status: stateFilter?.Status ?? "",
                    StatusContract: stateFilter?.StatusContract ?? "",
                    totalShow: stateFilter?.totalShow ?? "5",
                    filter: stateFilter?.filter ?? "",
                    keyword: `*${e.target.value}*`,
                    page: "1",
                  })
                );
                searchContractApproval();
              }, 2000);
            }}
          />
          <Search size={20} style={{ marginLeft: "-30px" }} className="mt-1" />
          <div className="mt-1 ml-1 pl-1 d-md-none d-block">
            <FilterLCA sessionData={sessionData} userRoles={userRoles} />
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default React.memo(UtilityConAp);
