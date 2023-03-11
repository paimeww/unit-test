import React from "react";
import { Row, Col } from "reactstrap";
import { Input, Label, CustomInput, Button } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReviseReasonSubmit from "components/Alert/ReviseReasonSubmit";
import DropdownFilterWorklistCA from "../components/DropdownFilterWorklistCA";
import DropdownSelectColumnWorklistCA from "../components/DropdownSelectColumnWorklistCA";
import { getListContractApproval } from "redux/middlewares/getListContractApproval";
import { useDispatch, useSelector } from "react-redux";
import { actionSetFilterContractApproval } from "redux/actions/contractApproval";

const MySwal = withReactContent(Swal);

const UtilityWorklistCA = ({ sessionData, userRoles }) => {
  const stateFilter = useSelector((state) => state.contractApproval.filter);
  const dispatch = useDispatch();
  const searchContractApproval = () => {
    dispatch(getListContractApproval(sessionData, userRoles));
  };

  return (
    <React.Fragment>
      <Col className="no-gutters p-0 m-0" xl="12" md="12" sm="12">
        <Row className="d-flex no-gutters justify-content-between align-items-end mt-3">
          <h2 className="">Worklist</h2>
        </Row>
      </Col>
      <Row className="mt-2">
        <Col
          className="d-flex align-items-center justify-content-between mt-1"
          xl="6"
          md="6"
          sm="6"
        >
          <div className="">
            <Label className="mr-1" for="search-input-1">
              Show
            </Label>
            <CustomInput
              id="show"
              type="select"
              className="custominput-table2 border-1"
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
                    page: stateFilter?.page ?? "1",
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
          <div className="row d-sm-none d-flex">
            <div className="">
              <DropdownFilterWorklistCA />
            </div>
            <div className="">
              <DropdownSelectColumnWorklistCA />
            </div>
          </div>
        </Col>
        <Col xl="6" md="6" sm="6">
          <Row className="d-flex justify-content-end align-items-center mt-1">
            <Col xl="6" md="6" sm="6">
              <Input
                className="search-table2"
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
                      page: stateFilter?.page ?? "1",
                    })
                  );
                  searchContractApproval();
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(UtilityWorklistCA);
