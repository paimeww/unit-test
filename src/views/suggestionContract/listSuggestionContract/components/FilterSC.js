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
import { actionSetFilterListSC } from "redux/actions/suggestionContract/listSC";
import { searchFilterListSC } from "redux/middlewares/searchFilterListSC";
import OptionGenericNames from "./OptionGenericNames";
import OptionItemCode from "./OptionItemCode";
import OptionItemDescription from "./OptionItemDescription";
import OptionManufacture from "./OptionManufacture";
import styles from "../CustomFilter.module.css";

const FilterSC = ({ listSC }) => {
  const [dropdownFilter, setDropdownFilter] = useState(false);

  const toggleDropdown = () => setDropdownFilter(!dropdownFilter);
  const stateFilter = useSelector((state) => state.listSC.filter);
  const dispatch = useDispatch();

  const filterListSC = (filter) => {
    dispatch(searchFilterListSC(filter, stateFilter?.keyword ?? "", "1"));
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
                      <OptionGenericNames
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        rtl={false}
                        listSC={listSC}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = value?.value ?? "";
                          let ItemCode = stateFilter?.ItemCode ?? "";
                          let Manufacture = stateFilter?.Manufacture ?? "";

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

                          let manufactureValue =
                            Manufacture.length != 0
                              ? `|Manufacture=${Manufacture}`
                              : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            manufactureValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListSC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              Manufacture: Manufacture,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListSC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Item Code</Label>
                      <OptionItemCode
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        listSC={listSC}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = value?.value ?? "";
                          let Manufacture = stateFilter?.Manufacture ?? "";

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

                          let manufactureValue =
                            Manufacture.length != 0
                              ? `|Manufacture=${Manufacture}`
                              : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            manufactureValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListSC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              Manufacture: Manufacture,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListSC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Item Description</Label>
                      <OptionItemDescription
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        listSC={listSC}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription = value?.value ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = stateFilter?.ItemCode ?? "";
                          let Manufacture = stateFilter?.Manufacture ?? "";

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

                          let manufactureValue =
                            Manufacture.length != 0
                              ? `|Manufacture=${Manufacture}`
                              : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            manufactureValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListSC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              Manufacture: Manufacture,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListSC(filterValue);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Manufacture</Label>
                      <OptionManufacture
                        showOption={false}
                        clearable={false}
                        disable={false}
                        loading={false}
                        listSC={listSC}
                        rtl={false}
                        searchable={true}
                        onChange={(value) => {
                          let ItemDescription =
                            stateFilter?.ItemDescription ?? "";
                          let GenericName = stateFilter?.GenericName ?? "";
                          let ItemCode = stateFilter?.ItemDescription ?? "";
                          let Manufacture = value?.value ?? "";

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

                          let manufactureValue =
                            Manufacture.length != 0
                              ? `|Manufacture=${Manufacture}`
                              : "";

                          let filterValue =
                            gNameValue +
                            itemDescValue +
                            itemCodeValue +
                            manufactureValue;

                          filterValue = filterValue.substring(1);

                          dispatch(
                            actionSetFilterListSC({
                              GenericName: GenericName,
                              ItemDescription: ItemDescription,
                              ItemCode: ItemCode,
                              Manufacture: Manufacture,
                              totalShow: stateFilter?.totalShow ?? "5",
                              filter: filterValue,
                              keyword: stateFilter?.keyword ?? "",
                              page: "1",
                            })
                          );
                          filterListSC(filterValue);
                        }}
                      />
                    </FormGroup>
                  </div>
                  <Button.Ripple
                    color="primary"
                    block
                    onClick={() => {
                      dispatch(
                        actionSetFilterListSC({
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
                      filterListSC("");
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

export default FilterSC;
