import React, { useEffect, useState } from "react";
import {
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import { MoreHorizontal } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputLoopComponent from "../components/InputLoopComponent";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import {
  exportExcelBC,
  updateForProccedForm,
} from "helpers/bidComparison/index";
import { useRouter } from "next/router";
import ModalComments from "../components/ModalComments";
import { useDispatch, useSelector } from "react-redux";
import { getBidComparison } from "redux/middlewares/getFormDetailBC";
import styles from "styles/request_forecast/scrollbar_horizontal.module.css";
import { thousandFormat } from "helpers/utils";
import moment from "moment";
import CustomForm from "pages/CustomForm";
import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import OptionRequestNumberBC from "../components/OptionRequestNumberBC";
import { actionClearBidComparison } from "redux/actions/bidComparison";
import OptionReferenceContract from "../components/OptionReferenceContract";
import OptionMaterials from "../components/OptionMaterials";
import { saveAs } from "file-saver";
import InfoNotification from "components/Alert/InfoNotification";

const MySwal = withReactContent(Swal);

const FromGroupBC = ({ data, sessionData }) => {
  const [userRoles, setUserRoles] = useState(null);

  const [visible, setVisible] = useState(false);
  const [itemComment, setItemComment] = useState(null);
  const [timeComment, setTimeComment] = useState(null);
  const [dataBody, setDataBody] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const loadingStatus = useSelector((state) => state.bidComparison.loading);

  const setInitialDataBody = () => {
    var listInitial = [];
    (data ?? []).map((item) => {
      const saving = item.isSaving ? ["Saving"] : [];
      const issue = item.isIssueSupply ? ["Issue Supply"] : [];
      const vendor = item.isSingleVendor ? ["Single Vendor"] : [];
      const source = item.isSingleSource ? ["Single Source"] : [];
      const dataInput = {
        responseNumber: item.responseNumber,
        reasonContract: [...saving, ...issue, ...vendor, ...source],
        referenceContract: item.referenceContract ?? "",
        noteInternal: item.noteInternal ?? "",
        isGroupMaterial: item.isKelompokMaterial,
        isOther: item.isOthers,
        valueGroupMaterial: item.kelompokMaterialValue,
        valueOther: item.othersValue,
      };

      listInitial = [...listInitial, dataInput];
    });
    setDataBody(listInitial);
  };

  useEffect(() => {
    setInitialDataBody();
    return () => {};
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRoles(JSON.parse(localStorage.getItem("userRoles")));
    }
    return () => {};
  }, []);

  const roleIsNegMgr = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Mgr"
  );

  const roleIsNeSpv = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Spv"
  );

  const isHaveAccess = roleIsNegMgr.length > 0 || roleIsNeSpv.length > 0;

  useEffect(() => {
    dispatch(actionClearBidComparison());
    return () => {};
  }, []);

  const [loadingProceed, setLoadingProceed] = useState(false);

  const confirmAlertProceed = async (body, idBid) => {
    const newInput = dataBody.filter(
      (el) => el.responseNumber == body.responseNumber
    );

    let isSetGroupMaterial =
      newInput[0].isGroupMaterial == true &&
      newInput[0].valueGroupMaterial.length > 0;
    let isSetOther =
      newInput[0].isOther == true && newInput[0].valueOther.length > 0;
    let isSetReason = newInput[0].reasonContract.length > 0;

    if (isSetGroupMaterial || isSetOther || isSetReason) {
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
              setLoadingProceed(true);
              var result = await updateForProccedForm(
                sessionData.user,
                body,
                "proceed",
                idBid,
                newInput
              );
              if (result) {
                await dispatch(getBidComparison(sessionData.user.token, id));
              }
              setLoadingProceed(false);
            }}
            title={"Proceed Contract"}
            description={"Are you sure want to process this contract?"}
            color={"warning"}
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
      return MySwal.fire({
        position: "center",
        html: (
          <InfoNotification
            title={"Info"}
            description={
              "Please select reason contract before preceed contract."
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
  };

  const [loadingReject, setLoadingReject] = useState(false);

  const confirmAlertReject = async (body, idBid) => {
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
            setLoadingReject(true);
            const newInput = dataBody.filter(
              (el) => el.responseNumber == body.responseNumber
            );
            var result = await updateForProccedForm(
              sessionData.user,
              body,
              "reject",
              idBid,
              newInput
            );
            if (result) {
              await dispatch(getBidComparison(sessionData.user.token, id));
            }
            setLoadingReject(false);
          }}
          title={"Reject"}
          description={"Are you sure want to reject this bid?"}
          color={"warning"}
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

  const [loadingExcel, setLoadingExcel] = useState(false);

  const confirmExportBC = () => {
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
            exportExcelBC(sessionData.user, id)
              .then((response) => {
                saveAs(
                  response.data,
                  `BidComparison (${moment().format(
                    "DD/MM/yyy hh:mm:ss"
                  )}).xlsx`
                );
                setLoadingExcel(false);
              })
              .catch((e) => {
                setLoadingExcel(false);
                console.log(e?.message);
              });
          }}
          title={"Export Data"}
          description={"Are you sure want to export this data ?"}
          color={"warning"}
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

  const setValueCheckbox = (value, item, type) => {
    const existingData = dataBody.filter(
      (el) => el.responseNumber == item.responseNumber
    );
    const oldData =
      existingData.length > 0 ? existingData[0].reasonContract : [];
    const valueGroupMaterial =
      existingData.length > 0 ? existingData[0].valueGroupMaterial : "";
    const valueOther =
      existingData.length > 0 ? existingData[0].valueOther : "";
    const isGroupMaterial =
      existingData.length > 0 ? existingData[0].isGroupMaterial : false;
    const isOther = existingData.length > 0 ? existingData[0].isOther : false;

    if (value.target.value == "Kelompok Material") {
      isGroupMaterial = !isGroupMaterial;
    }

    if (value.target.value == "Other") {
      isOther = !isOther;
    }

    if (type == "Kelompok Material") {
      valueGroupMaterial = value.target.value;
    }

    if (type == "Other") {
      valueOther = value.target.value;
    }

    if (value?.target?.checked) {
      const dataInput = {
        responseNumber: item.responseNumber,
        reasonContract:
          value.target.value == "Kelompok Material" ||
          value.target.value == "Other"
            ? [...oldData]
            : [...oldData, value.target.value],
        referenceContract: existingData[0]?.referenceContract ?? "",
        noteInternal: existingData[0]?.noteInternal ?? "",
        isGroupMaterial: isGroupMaterial,
        isOther: isOther,
        valueGroupMaterial: valueGroupMaterial,
        valueOther: valueOther,
      };
      const oldDataInput = dataBody.filter(
        (el) => el.responseNumber != item.responseNumber
      );
      setDataBody([...oldDataInput, dataInput]);
    } else {
      const removeData = oldData.filter((el) => el != value.target.value);
      const dataInput = {
        responseNumber: item.responseNumber,
        reasonContract: removeData,
        referenceContract: existingData[0]?.referenceContract ?? "",
        noteInternal: existingData[0]?.noteInternal ?? "",
        isGroupMaterial: isGroupMaterial,
        isOther: isOther,
        valueGroupMaterial: valueGroupMaterial,
        valueOther: valueOther,
      };
      const oldDataInput = dataBody.filter(
        (el) => el.responseNumber != item.responseNumber
      );
      setDataBody([...oldDataInput, dataInput]);
    }
  };

  return (
    <div className="pl-2 mt-2 col-11">
      <CustomForm
        header="Form Input"
        subheader="Information Details"
        formTitle="Form Bid Comparison"
        formSubtitle="Be sure to check your input was correct"
      >
        {!loadingExcel && (
          <div className="row px-1 mb-1">
            <Button.Ripple
              onClick={() => confirmExportBC()}
              color="success"
              className="px-2 mt-2 mt-sm-0 col-12 col-sm-auto"
            >
              Export to Excel
            </Button.Ripple>
          </div>
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

        <div className="col-12 col-md-4 p-0 m-0 mb-2 mt-2">
          <FormGroup>
            <Label className="font-weight-bold" for="noRequest">
              No. Request
            </Label>
            <OptionRequestNumberBC
              showOption={false}
              clearable={false}
              disable={false}
              loading={false}
              rtl={false}
              searchable={true}
              token={sessionData.user.token}
              onChange={(value) => {
                setId(value?.value ?? null);
                dispatch(
                  getBidComparison(sessionData.user.token, value?.value ?? "")
                );
              }}
            />
          </FormGroup>
        </div>
        {loadingStatus && <BasicSkeleton />}
        {data && !loadingStatus && (
          <React.Fragment>
            <div className="col-12 col-md-4 p-0 m-0 mb-2 mt-2">
              <FormGroup>
                <Label className="font-weight-bold" for="itemName">
                  Item Name
                </Label>
                <Input
                  id="itemName"
                  name="itemName"
                  type="text"
                  disabled
                  value={data[0].genericName}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-md-4 p-0 m-0 mb-2 mt-2">
              <FormGroup>
                <Label className="font-weight-bold" for="totalQTY">
                  Total QTY PPIC
                </Label>
                <Input
                  style={{ textAlign: "right" }}
                  id="totalQTY"
                  name="totalQTY"
                  type="text"
                  disabled
                  value={thousandFormat(data[0].totalQtyPpic)}
                />
              </FormGroup>
            </div>
            <br />
            <div id={styles.Table}>
              <InputLoopComponent data={data} label="No. Response">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={item.responseNumber}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Vendor">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="textarea"
                          disabled
                          value={item.vendorName}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Manufacture">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="textarea"
                          disabled
                          value={item.manufacturer}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="QTY">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          style={{ textAlign: "right" }}
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={thousandFormat(item.qty)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="UOM">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={item.uom}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Periode Start">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={moment(item.periodeStart).format(
                            "DD-MMM-YYYY"
                          )}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Periode End">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={moment(item.periodeEnd).format("DD-MMM-YYYY")}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Delivery Allowance">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={moment(item?.deliveryAllowance).format(
                            "DD-MMM-YYYY"
                          )}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Note To Vendor">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="textarea"
                          disabled
                          value={item.notetoVendor}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <div className="my-2 font-weight-bold">Vendor Bid</div>
              <InputLoopComponent data={data} label="Qty Bid">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          style={{ textAlign: "right" }}
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={thousandFormat(item.bidQty)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price Bid Per UOM">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          style={{ textAlign: "right" }}
                          value={item.bidPricePerUOM}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Currency">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={item.bidCurrency}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Note">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="textarea"
                          disabled
                          value={item.bidNote}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Periode Start Bid">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="bidPeriodeStart"
                          name="bidPeriodeStart"
                          type="text"
                          disabled
                          value={moment(item.bidPeriodeStart).format(
                            "DD-MMM-YYYY"
                          )}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Periode End Bid">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="bidPeriodeEnd"
                          name="bidPeriodeEnd"
                          type="text"
                          disabled
                          value={moment(item.bidPeriodeEnd).format(
                            "DD-MMM-YYYY"
                          )}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Delivery Allowance Bid">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="bidDeliveryAllowance"
                          name="bidDeliveryAllowance"
                          type="text"
                          disabled
                          value={moment(item.bidDeliveryAllowance).format(
                            "DD-MMM-YYYY"
                          )}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="Price Y-2 MIN">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          style={{ textAlign: "right" }}
                          value={thousandFormat(item.priceY2Min)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price Y-2 MAX">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          style={{ textAlign: "right" }}
                          disabled
                          value={thousandFormat(item.priceY2Max)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price Y-2 Last PO">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          style={{ textAlign: "right" }}
                          name="noRequest"
                          type="text"
                          disabled
                          value={thousandFormat(item.priceY2Last)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price Y-1 MIN">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          style={{ textAlign: "right" }}
                          value={thousandFormat(item.priceY1Min)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price Y-1 MAX">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          style={{ textAlign: "right" }}
                          disabled
                          value={thousandFormat(item.priceY1Max)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price Y-1 Last PO">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          style={{ textAlign: "right" }}
                          value={thousandFormat(item.priceY1Last)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price CY MIN">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          style={{ textAlign: "right" }}
                          type="text"
                          disabled
                          value={thousandFormat(item.priceYtdMin)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price CY MAX">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          style={{ textAlign: "right" }}
                          name="noRequest"
                          type="text"
                          disabled
                          value={thousandFormat(item.priceYtdMax)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="Price CY Last PO">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          style={{ textAlign: "right" }}
                          disabled
                          value={thousandFormat(item.priceYtdLast)}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="EKV Pharma">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={
                            item.ekvPharma.length > 0 ? item.ekvPharma : "-"
                          }
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <InputLoopComponent data={data} label="EKV CHD">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        <Input
                          id="noRequest"
                          name="noRequest"
                          type="text"
                          disabled
                          value={item.ekvChd.length > 0 ? item.ekvChd : "-"}
                        />
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="Alasan Kontrak">
                {data.map((item, index) => {
                  const existingData = dataBody.filter(
                    (el) => el.responseNumber == item.responseNumber
                  );

                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <CustomInput
                        type="checkbox"
                        id={"single_source" + item.id}
                        label="Single Source"
                        disabled={
                          item.status == "Proceed to Contract" ? true : false
                        }
                        className="mb-2"
                        defaultChecked={item.isSingleSource}
                        value={"Single Source"}
                        onChange={(value) => {
                          setValueCheckbox(value, item);
                        }}
                      />
                      <div className="mb-2 row d-flex align-items-center pl-0 col-12 p-0 m-0">
                        <CustomInput
                          type="checkbox"
                          id={"material_group" + item.id}
                          label="Kelompok Material"
                          disabled={
                            item.status == "Proceed to Contract" ? true : false
                          }
                          className="col-3"
                          defaultChecked={item.isKelompokMaterial}
                          value={"Kelompok Material"}
                          onChange={(value) => {
                            setValueCheckbox(value, item);
                          }}
                        />
                        {existingData[0]?.isGroupMaterial && (
                          <div
                            style={{
                              display: "block",
                              position: "relative",
                              zIndex: 9999,
                            }}
                            className="pl-md-4 pl-2 mt-2 mt-md-0 col-9 p-0 m-0"
                          >
                            <div className="pl-1">
                              {item.status == "Proceed to Contract" && (
                                <Input
                                  id="noRequest"
                                  name="noRequest"
                                  type="text"
                                  placeholder="Placeholder"
                                  disabled
                                  value={item.kelompokMaterialValue}
                                />
                              )}
                              {item.status != "Proceed to Contract" && (
                                <OptionMaterials
                                  id={"OptionMaterials" + item.id}
                                  token={sessionData.user.token}
                                  onChange={(value) => {
                                    setValueCheckbox(
                                      { target: { value: value?.value ?? "" } },
                                      item,
                                      "Kelompok Material"
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <CustomInput
                        type="checkbox"
                        id={"saving" + item.id}
                        label="Saving"
                        disabled={
                          item.status == "Proceed to Contract" ? true : false
                        }
                        className="mb-2"
                        defaultChecked={item.isSaving}
                        value={"Saving"}
                        onChange={(value) => {
                          setValueCheckbox(value, item);
                        }}
                      />
                      <CustomInput
                        type="checkbox"
                        id={"issue_supply" + item.id}
                        label="Issue Supply"
                        disabled={
                          item.status == "Proceed to Contract" ? true : false
                        }
                        className="mb-2"
                        defaultChecked={item.isIssueSupply}
                        value={"Issue Supply"}
                        onChange={(value) => {
                          setValueCheckbox(value, item);
                        }}
                      />
                      <CustomInput
                        type="checkbox"
                        id={"single_vendor" + item.id}
                        label="Single Vendor"
                        disabled={
                          item.status == "Proceed to Contract" ? true : false
                        }
                        className="mb-2"
                        defaultChecked={item.isSingleVendor}
                        value={"Single Vendor"}
                        onChange={(value) => {
                          setValueCheckbox(value, item);
                        }}
                      />
                      <CustomInput
                        type="checkbox"
                        id={"other" + item.id}
                        label="Other"
                        disabled={
                          item.status == "Proceed to Contract" ? true : false
                        }
                        className="mb-2"
                        defaultChecked={item.isOthers}
                        value={"Other"}
                        onChange={(value) => {
                          setValueCheckbox(value, item);
                        }}
                      />
                      {existingData[0]?.isOther && (
                        <div className="col-md-12 col-12 pl-2 m-0 p-0">
                          <Input
                            id={"other" + item.id}
                            name={"other" + item.id}
                            placeholder="Placeholder"
                            disabled={
                              item.status == "Proceed to Contract"
                                ? true
                                : false
                            }
                            type="textarea"
                            defaultValue={existingData[0]?.valueOther}
                            onChange={(value) => {
                              setValueCheckbox(value, item, "Other");
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="Reference Contract">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      {item.status == "Proceed to Contract" && (
                        <Input
                          id="noRequest"
                          name="noRequest"
                          placeholder="Placeholder"
                          type="text"
                          disabled
                          value={item.referenceContract}
                          onChange={(_) => {}}
                        />
                      )}
                      {item.status != "Proceed to Contract" && (
                        <OptionReferenceContract
                          showOption={false}
                          clearable={false}
                          disable={false}
                          genericName={item.genericName}
                          loading={false}
                          rtl={false}
                          searchable={true}
                          vendorId={item.vendorId}
                          onChange={(value) => {
                            const existingData = dataBody.filter(
                              (el) => el.responseNumber == item.responseNumber
                            );

                            const dataInput = {
                              responseNumber: item.responseNumber,
                              reasonContract:
                                existingData[0]?.reasonContract ?? [],
                              referenceContract: value?.value ?? null,
                              noteInternal: existingData[0]?.noteInternal ?? "",
                              isGroupMaterial:
                                existingData[0]?.isGroupMaterial ?? false,
                              isOther: existingData[0]?.isOther ?? false,
                              valueGroupMaterial:
                                existingData[0]?.valueGroupMaterial ?? "",
                              valueOther: existingData[0]?.valueOther ?? "",
                            };

                            const oldDataInput = dataBody.filter(
                              (el) => el.responseNumber != item.responseNumber
                            );

                            setDataBody([...oldDataInput, dataInput]);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="Note Print Out Contract">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                    >
                      <FormGroup className="mx-0 px-0">
                        {item.status != "Proceed to Contract" && (
                          <Input
                            id="noRequest"
                            name="noRequest"
                            type="textarea"
                            placeholder="Placeholder"
                            onChange={(value) => {
                              const existingData = dataBody.filter(
                                (el) => el.responseNumber == item.responseNumber
                              );

                              const dataInput = {
                                responseNumber: item.responseNumber,
                                reasonContract:
                                  existingData[0]?.reasonContract ?? [],
                                referenceContract:
                                  existingData[0]?.referenceContract ?? "",
                                noteInternal: value.target.value,
                                isGroupMaterial:
                                  existingData[0]?.isGroupMaterial ?? false,
                                isOther: existingData[0]?.isOther ?? false,
                                valueGroupMaterial:
                                  existingData[0]?.valueGroupMaterial ?? "",
                                valueOther: existingData[0]?.valueOther ?? "",
                              };

                              const oldDataInput = dataBody.filter(
                                (el) => el.responseNumber != item.responseNumber
                              );

                              setDataBody([...oldDataInput, dataInput]);
                            }}
                          />
                        )}
                        {item.status == "Proceed to Contract" && (
                          <Input
                            id="noRequest"
                            name="noRequest"
                            type="textarea"
                            placeholder="Placeholder"
                            disabled
                            value={item.noteInternal}
                          />
                        )}
                      </FormGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="View Comments">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{
                        width: data.length <= 3 ? "100%" : 450,
                      }}
                      className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                      onClick={() => {
                        setItemComment(item);
                        setTimeComment(moment().format("DDMMYYHHmmss"));
                        setVisible(true);
                      }}
                    >
                      <InputGroup>
                        <Input
                          id="noRequest"
                          name="noRequest"
                          placeholder="View Comments"
                          type="number"
                          disabled
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText
                            onClick={() => {
                              setItemComment(item);
                              setTimeComment(moment().format("DDMMYYHHmmss"));
                              setVisible(true);
                            }}
                          >
                            <MoreHorizontal className="feather-more-horizontal" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  );
                })}
              </InputLoopComponent>
              <br />
              <br />
              <InputLoopComponent data={data} label="">
                {data.map((item) => {
                  const isShowButton =
                    item.status == "Draft" &&
                    item.status != "Proceed to Contract" &&
                    isHaveAccess;
                  return (
                    <React.Fragment key={item.id}>
                      {isShowButton && !loadingProceed && (
                        <div
                          key={item.id}
                          style={{
                            width: data.length <= 3 ? "100%" : 450,
                          }}
                          className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                        >
                          <Button.Ripple
                            onClick={() => confirmAlertProceed(item, item.id)}
                            color="success"
                            className="col-12"
                          >
                            Proceed Contract
                          </Button.Ripple>
                        </div>
                      )}
                      {loadingProceed && (
                        <div
                          style={{
                            width: data.length <= 3 ? "100%" : 450,
                          }}
                          className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                        >
                          <Button.Ripple color="success" className="col-12">
                            <Spinner
                              animation="border"
                              role="status"
                              size="sm"
                              color="white"
                            ></Spinner>
                          </Button.Ripple>
                        </div>
                      )}
                      {!isShowButton && (
                        <div
                          style={{
                            width: data.length <= 3 ? "100%" : 450,
                          }}
                          className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                        ></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </InputLoopComponent>
              <br />
              <InputLoopComponent data={data} label="">
                {data.map((item) => {
                  const isClosed =
                    item.status == "Closed" && item.cancelReason.length > 0;
                  const isDraft = item.status == "Draft";
                  const checkStatus = isDraft || isClosed;
                  const isShowButton =
                    checkStatus &&
                    item.status != "Proceed to Contract" &&
                    isHaveAccess;

                  return (
                    <React.Fragment key={item.id}>
                      {isShowButton && !loadingReject && (
                        <div
                          key={item.id}
                          style={{
                            width: data.length <= 3 ? "100%" : 450,
                          }}
                          className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                        >
                          <Button.Ripple
                            onClick={() => confirmAlertReject(item, item.id)}
                            color="danger"
                            className="col-12"
                          >
                            Reject
                          </Button.Ripple>
                        </div>
                      )}

                      {loadingReject && (
                        <div
                          style={{
                            width: data.length <= 3 ? "100%" : 450,
                          }}
                          className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                        >
                          <Button.Ripple color="danger" className="col-12">
                            <Spinner
                              animation="border"
                              role="status"
                              size="sm"
                              color="white"
                            ></Spinner>
                          </Button.Ripple>
                        </div>
                      )}

                      {!isShowButton && (
                        <div
                          style={{
                            width: data.length <= 3 ? "100%" : 450,
                          }}
                          className="ml-md-2 mr-2 mr-md-0 mx-0 px-0 mt-1 mt-md-0"
                        ></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </InputLoopComponent>
              <br />
              <br />
              <br />
              <br />
            </div>
          </React.Fragment>
        )}
        <br />
        <br />
        <br />
        <br />
      </CustomForm>
      <ModalComments
        toggle={() => {
          setVisible(!visible);
        }}
        timeComment={timeComment}
        visible={visible}
        itemComment={itemComment}
      />
    </div>
  );
};

export default FromGroupBC;
