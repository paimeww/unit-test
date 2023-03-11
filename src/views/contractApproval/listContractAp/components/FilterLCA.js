import { Formik } from "formik";
import { getPermissionComponent } from "helpers/getPermission";
import { useState } from "react";
import { Filter } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CustomInput,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import OptionRequestNumber from "./OptionRequestNumber";
import OptionContractNumber from "./OptionContractNumber";
import OptionItemName from "./OptionItemName";
import OptionManufacture from "./OptionManufacture";
import styles from "../CustomFilter.module.css";
import { actionSetFilterContractApproval } from "redux/actions/contractApproval";
import { getListContractApproval } from "redux/middlewares/getListContractApproval";
import OptionVendor from "./OptionVendor";
import OptionStatusApproval from "./OptionStatusApproval";
import OptionStatusContract from "./OptionStatusContract";

const FilterLCA = ({ sessionData, userRoles, inquiry }) => {
  const [dropdownFilter, setDropdownFilter] = useState(false);

  const toggleDropdown = () => setDropdownFilter(!dropdownFilter);
  const stateFilter = useSelector((state) => state.contractApproval.filter);
  const dispatch = useDispatch();

  const filterListCA = (filter) => {
    if ((inquiry == "inquiry")) {
      dispatch(
        getListContractApproval(sessionData, userRoles, filter, null, "inquiry")
      );
    } else {
      dispatch(getListContractApproval(sessionData, userRoles, filter, null));
    }
  };

  return (
    <div
      style={{ zIndex: 300 }}
      className="content-header-right text-md-right col-md-3 col-12 d-md-block p-0 m-0"
    >
      <div className="form-group breadcrumb-right dropdown m-0">
        <Dropdown isOpen={dropdownFilter} toggle={toggleDropdown}>
          <DropdownToggle
            color="primary"
            className="btn-icon btn-round dropdown-toggle"
          >
            <Filter size={24} />
          </DropdownToggle>
          <DropdownMenu
            right
            className={`${styles.custom} p-1`}
            style={{ maxHeight: "30rem", right: "0" }}
          >
            <Formik
              initialValues={{}}
              onSubmit={(values) => {
                setDropdownFilter(false);
              }}
            >
              {({ handleChange, handleSubmit }) => (
                <>
                  <div
                    className="overflow-auto my-2 pr-1 border-bottom-0"
                    style={{ maxHeight: "20rem" }}
                  >
                    <FormGroup>
                      <Label className="form-label">No. Request</Label>
                      <OptionRequestNumber
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = value?.value ?? "";
                          let ContractNumber =
                            stateFilter?.ContractNumber ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let Manufacturer = stateFilter?.Manufacturer ?? "";
                          let VendorName = stateFilter?.VendorName ?? "";
                          let Status = stateFilter?.Status ?? "";
                          let StatusContract =
                            stateFilter?.StatusContract ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">No. Contract</Label>
                      <OptionContractNumber
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let ContractNumber = value?.value ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let Manufacturer = stateFilter?.Manufacturer ?? "";
                          let VendorName = stateFilter?.VendorName ?? "";
                          let Status = stateFilter?.Status ?? "";
                          let StatusContract =
                            stateFilter?.StatusContract ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Item Name</Label>
                      <OptionItemName
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let ContractNumber =
                            stateFilter?.ContractNumber ?? "";
                          let GenericName = value?.value ?? "";
                          let Manufacturer = stateFilter?.Manufacturer ?? "";
                          let VendorName = stateFilter?.VendorName ?? "";
                          let Status = stateFilter?.Status ?? "";
                          let StatusContract =
                            stateFilter?.StatusContract ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Manufacturer</Label>
                      <OptionManufacture
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let ContractNumber =
                            stateFilter?.ContractNumber ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let Manufacturer = value?.value ?? "";
                          let VendorName = stateFilter?.VendorName ?? "";
                          let Status = stateFilter?.Status ?? "";
                          let StatusContract =
                            stateFilter?.StatusContract ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Vendor</Label>
                      <OptionVendor
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let ContractNumber =
                            stateFilter?.ContractNumber ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let Manufacturer = stateFilter?.Manufacturer ?? "";
                          let VendorName = value?.value ?? "";
                          let Status = stateFilter?.Status ?? "";
                          let StatusContract =
                            stateFilter?.StatusContract ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Status Approval</Label>
                      <OptionStatusApproval
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let ContractNumber =
                            stateFilter?.ContractNumber ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let Manufacturer = stateFilter?.Manufacturer ?? "";
                          let VendorName = stateFilter?.VendorName ?? "";
                          let Status = value?.value ?? "";
                          let StatusContract =
                            stateFilter?.StatusContract ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Status Contract</Label>
                      <OptionStatusContract
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let ContractNumber =
                            stateFilter?.ContractNumber ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let Manufacturer = stateFilter?.Manufacturer ?? "";
                          let VendorName = stateFilter?.VendorName ?? "";
                          let Status = stateFilter?.Status ?? "";
                          let StatusContract = value?.value ?? "";

                          let contractNumberValue =
                            ContractNumber.length != 0
                              ? `|ContractNumber=${ContractNumber}`
                              : "";

                          let reqNumberValue =
                            RequestNumber.length != 0
                              ? `|RequestNumber=${RequestNumber}`
                              : "";

                          let itemNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let manufactureValue =
                            Manufacturer.length != 0
                              ? `|Manufacturer=${Manufacturer}`
                              : "";

                          let vendorNameValue =
                            VendorName.length != 0
                              ? `|VendorName=${VendorName}`
                              : "";

                          let statusValue =
                            Status.length != 0 ? `|Status=${Status}` : "";

                          let statusContractValue =
                            StatusContract.length != 0
                              ? `|StatusContract=${StatusContract}`
                              : "";

                          let filterValue =
                            contractNumberValue +
                            reqNumberValue +
                            itemNameValue +
                            manufactureValue +
                            vendorNameValue +
                            statusValue +
                            statusContractValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterContractApproval({
                              ContractNumber: ContractNumber,
                              RequestNumber: RequestNumber,
                              GenericName: GenericName,
                              Manufacturer: Manufacturer,
                              VendorName: VendorName,
                              Status: Status,
                              StatusContract: StatusContract,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListCA(filterValue);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <Button.Ripple
                    color="primary"
                    block
                    onClick={() => {
                      dispatch(
                        actionSetFilterContractApproval({
                          ContractNumber: "",
                          RequestNumber: "",
                          GenericName: "",
                          Manufacturer: "",
                          VendorName: "",
                          Status: "",
                          StatusContract: "",
                          totalShow: stateFilter?.totalShow ?? "5",
                          filter: "",
                          keyword: stateFilter?.keyword ?? "",
                          page: "1",
                        })
                      );
                      filterListCA("");
                    }}
                  >
                    Clear Filter
                  </Button.Ripple>
                </>
              )}
            </Formik>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default FilterLCA;
