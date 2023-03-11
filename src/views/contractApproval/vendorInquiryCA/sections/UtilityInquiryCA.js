import React from "react";
import { Row, Col } from "reactstrap";
import { Input, Label, CustomInput } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { actionSetFilterContractApproval } from "redux/actions/contractApproval";
import { getListContractApproval } from "redux/middlewares/getListContractApproval";
import FilterLCA from "../../listContractAp/components/FilterLCA";
import { Search } from "react-feather";
import { debounce, debounceTwo } from "helpers/utils";

const MySwal = withReactContent(Swal);

const UtilityInquiryCA = ({ sessionData, userRoles }) => {
  const stateFilter = useSelector((state) => state.contractApproval.filter);
  const dispatch = useDispatch();
  const searchContractApproval = () => {
    dispatch(
      getListContractApproval(sessionData, userRoles, null, "vendor", "inquiry")
    );
  };

  return (
    <React.Fragment>
      <Col className="no-gutters p-0 m-0" xl="12" md="12" sm="12">
        <Row className="d-flex no-gutters justify-content-between align-items-end mt-3">
          <h2 className="">Form Inquiry</h2>
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
                    page: stateFilter?.page ?? "1",
                  })
                );
                searchContractApproval();
              }, 2000);
            }}
          />
          <Search size={20} style={{ marginLeft: "-30px" }} className="mt-1" />
          <div className="mt-1 ml-1 pl-1 d-md-none d-block">
            <FilterLCA
              sessionData={sessionData}
              userRoles={userRoles}
              inquiry={"inquiry"}
            />
          </div>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default React.memo(UtilityInquiryCA);
