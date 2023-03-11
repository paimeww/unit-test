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
import { actionSetFilterListFC } from "redux/actions/forecastCalculation";
import { searchFilterListFC } from "redux/middlewares/searchFilterListFC";
import OptionGenericName from "./OptionGenericName";
import OptionItemCode from "./OptionItemCode";
import OptionItemDescription from "./OptionItemDescription";
import OptionRequestNumber from "./OptionRequestNumber";
import styles from "../CustomFilter.module.css";
import OptionSite from "./OptionSite";

const FilterFC = ({ sessionData, userRoles }) => {
  const [dropdownFilter, setDropdownFilter] = useState(false);

  const toggleDropdown = () => setDropdownFilter(!dropdownFilter);
  const stateFilter = useSelector((state) => state.listFC.filter);
  const dispatch = useDispatch();

  const filterListFC = (filter) => {
    // dispatch(searchFilterListFC(sessionData, userRoles, filter, "1"));
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
                      <Label className="form-label">Generic Name</Label>
                      <OptionGenericName
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        sessionData={sessionData}
                        userRoles={userRoles}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = value?.value ?? "";
                          let ItemCode = stateFilter?.ItemCode ?? "";
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let Site = stateFilter?.Site ?? "";

                          let gNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let itemDescValue =
                            ItemDescription.length != 0
                              ? `|ItemDescription=${ItemDescription}`
                              : "";

                          let itemCodeValue =
                            ItemCode.length != 0 ? `|ItemCode=${ItemCode}` : "";

                          let requestNumberValue =
                            RequestNumber.length != 0
                              ? `|requestNumber=${RequestNumber}`
                              : "";

                          let siteValue =
                            Site.length != 0 ? `|site=${Site}` : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            requestNumberValue +
                            siteValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListFC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              RequestNumber: RequestNumber,
                              Site: Site,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListFC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Item Code</Label>
                      <OptionItemCode
                        showOption={false}
                        clearable={false}
                        disable={false}
                        sessionData={sessionData}
                        userRoles={userRoles}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = value?.value ?? "";
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let Site = stateFilter?.Site ?? "";

                          let gNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let itemDescValue =
                            ItemDescription.length != 0
                              ? `|ItemDescription=${ItemDescription}`
                              : "";

                          let itemCodeValue =
                            ItemCode.length != 0 ? `|ItemCode=${ItemCode}` : "";

                          let requestNumberValue =
                            RequestNumber.length != 0
                              ? `|requestNumber=${RequestNumber}`
                              : "";

                          let siteValue =
                            Site.length != 0 ? `|site=${Site}` : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            requestNumberValue +
                            siteValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListFC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              RequestNumber: RequestNumber,
                              Site: Site,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListFC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Item Description</Label>
                      <OptionItemDescription
                        showOption={false}
                        clearable={false}
                        disable={false}
                        sessionData={sessionData}
                        userRoles={userRoles}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription = value?.value ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = stateFilter?.ItemCode ?? "";
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let Site = stateFilter?.Site ?? "";

                          let gNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let itemDescValue =
                            ItemDescription.length != 0
                              ? `|ItemDescription=${ItemDescription}`
                              : "";

                          let itemCodeValue =
                            ItemCode.length != 0 ? `|ItemCode=${ItemCode}` : "";

                          let requestNumberValue =
                            RequestNumber.length != 0
                              ? `|requestNumber=${RequestNumber}`
                              : "";

                          let siteValue =
                            Site.length != 0 ? `|site=${Site}` : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            requestNumberValue +
                            siteValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListFC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              RequestNumber: RequestNumber,
                              Site: Site,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListFC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Request Number</Label>
                      <OptionRequestNumber
                        showOption={false}
                        clearable={false}
                        sessionData={sessionData}
                        userRoles={userRoles}
                        disable={false}
                        loading={false}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = stateFilter?.ItemCode ?? "";
                          let RequestNumber = value?.value ?? "";
                          let Site = stateFilter?.Site ?? "";

                          let gNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let itemDescValue =
                            ItemDescription.length != 0
                              ? `|ItemDescription=${ItemDescription}`
                              : "";

                          let itemCodeValue =
                            ItemCode.length != 0 ? `|ItemCode=${ItemCode}` : "";

                          let requestNumberValue =
                            RequestNumber.length != 0
                              ? `|requestNumber=${RequestNumber}`
                              : "";

                          let siteValue =
                            Site.length != 0 ? `|site=${Site}` : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            requestNumberValue +
                            siteValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListFC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              RequestNumber: RequestNumber,
                              Site: Site,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListFC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Site</Label>
                      <OptionSite
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        sessionData={sessionData}
                        userRoles={userRoles}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = stateFilter?.ItemCode ?? "";
                          let RequestNumber = stateFilter?.RequestNumber ?? "";
                          let Site = value?.value ?? "";

                          let gNameValue =
                            GenericName.length != 0
                              ? `|GenericName=${GenericName}`
                              : "";

                          let itemDescValue =
                            ItemDescription.length != 0
                              ? `|ItemDescription=${ItemDescription}`
                              : "";

                          let itemCodeValue =
                            ItemCode.length != 0 ? `|ItemCode=${ItemCode}` : "";

                          let requestNumberValue =
                            RequestNumber.length != 0
                              ? `|requestNumber=${RequestNumber}`
                              : "";

                          let siteValue =
                            Site.length != 0 ? `|site=${Site}` : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            requestNumberValue +
                            siteValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListFC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              RequestNumber: RequestNumber,
                              Site: Site,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListFC(filterValue);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <Button.Ripple
                    color="primary"
                    block
                    onClick={() => {
                      dispatch(
                        actionSetFilterListFC({
                          GenericName: "",
                          ItemDescription: "",
                          ItemCode: "",
                          RequestNumber: "",
                          totalShow: stateFilter?.totalShow ?? "5",
                          filter: "",
                          keyword: stateFilter?.keyword ?? "",
                          page: "1",
                        })
                      );
                      filterListFC("");
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

export default FilterFC;
