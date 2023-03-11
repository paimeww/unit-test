import WrapperCustomScrollbar from "components/custom/WrapperCustomScrollbar";
import { setRequestBid } from "helpers/requestBid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { actionSetRequestBid } from "redux/actions/requestBid/getFormRequestBid";
import OptionListManufacture from "./OptionListManufacture";
import OptionListVendor from "./OptionListVendor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InfoNotification from "components/Alert/InfoNotification";
const MySwal = withReactContent(Swal);

function ModalNewRequest({ visible, toggle, formRequestBid, uom }) {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    requestBidId: formRequestBid.id,
    requestNumber: formRequestBid.requestNumber,
    vendorId: "",
    vendorName: "",
    vendorEmail: "-",
    manufacture: "",
    qty: "",
    uom: uom?.value ?? "",
    periodeStart: "",
    periodeEnd: "",
    allowance: "",
    noteToVendor: "",
    dueDateResponse: "-",
  });

  const infoNotification = (msg) => {
    return MySwal.fire({
      position: "center",
      html: (
        <InfoNotification
          title={"Info"}
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

  useEffect(() => {
    setFormValue({
      requestBidId: formValue.requestBidId,
      requestNumber: formValue.requestNumber,
      vendorId: formValue.vendorId,
      vendorName: formValue.vendorName,
      vendorEmail: formValue.vendorEmail,
      manufacture: formValue.manufacture,
      qty: formValue.qty,
      uom: uom?.value ?? "",
      periodeStart: formValue.periodeStart,
      periodeEnd: formValue.periodeEnd,
      allowance: formValue.allowance,
      noteToVendor: formValue.noteToVendor,
      dueDateResponse: formValue.dueDateResponse,
    });

    return () => {};
  }, [uom]);

  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  return (
    <div className="">
      <Modal
        isOpen={visible}
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
        toggle={() => {
          setFormValue({
            requestBidId: formRequestBid.id,
            requestNumber: formRequestBid.requestNumber,
            vendorId: "",
            vendorName: "",
            vendorEmail: "-",
            manufacture: "",
            qty: "",
            uom: uom?.value ?? "",
            periodeStart: "",
            periodeEnd: "",
            allowance: "",
            noteToVendor: "",
            dueDateResponse: "-",
          });
          toggle();
        }}
        className={"pr-2 pr-md-0 pl-sm-2 pl-md-0"}
        centered={true}
      >
        <ModalHeader
          className=""
          toggle={() => {
            setFormValue({
              requestBidId: formRequestBid.id,
              requestNumber: formRequestBid.requestNumber,
              vendorId: "",
              vendorName: "",
              vendorEmail: "-",
              manufacture: "",
              qty: "",
              uom: uom?.value ?? "",
              periodeStart: "",
              periodeEnd: "",
              allowance: "",
              noteToVendor: "",
              dueDateResponse: "-",
            });
            toggle();
          }}
        ></ModalHeader>
        <ModalBody>
          <h4 className="bold">Form Request Bid for Contract</h4>
          <span className="text-black-50 small">
            Be sure to check "Form Request Bid for Contract" before you continue
          </span>
          <br />
          <br />
          <div className="col-12 m-0 p-0">
            <FormGroup>
              {/* <Label for="idVendor">ID Vendor</Label> */}
              <Input
                id="newIdVendor"
                name="newIdVendor"
                placeholder="Placeholder"
                type="text"
                hidden
                onChange={(value) => {
                  const inputValue = value.target.value;
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: inputValue,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newVendorName">Vendor Name</Label>
              <OptionListVendor
                showOption={false}
                clearable={false}
                disable={false}
                loading={false}
                rtl={false}
                searchable={true}
                listBidContracts={formRequestBid?.requestBidContracts}
                onChange={(value) => {
                  const id = value?.id ?? "";
                  const name = value?.value ?? "";
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: id,
                    vendorName: name,
                    vendorEmail: "-",
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Input
                id="newVendorEmail"
                name="newVendorEmail"
                placeholder="Placeholder"
                hidden
                type="text"
                onChange={(value) => {
                  const inputValue = value.target.value;
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: inputValue,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newManufacture">Manufacture</Label>
              <OptionListManufacture
                showOption={false}
                clearable={false}
                disable={false}
                loading={false}
                rtl={false}
                searchable={true}
                onChange={(value) => {
                  const inputValue = value?.value ?? "";
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: inputValue,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newQty">QTY</Label>
              <Input
                id="newQty"
                name="newQty"
                placeholder="Placeholder"
                type="number"
                onChange={(value) => {
                  const inputValue = value.target.value;
                  var fval = inputValue * 1;

                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: inputValue,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newUom">UOM</Label>
              <Input
                id="newUom"
                name="newUom"
                placeholder="Placeholder"
                type="text"
                disabled
                value={uom?.value ?? ""}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newPeriodeStart">Periode Start</Label>
              <DatePicker
                placeholderText="dd-mm-yyyy"
                dateFormat="dd-MMM-y"
                className={`form-control datepicker-table2`}
                selected={formValue.periodeStart}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(e) => {
                  const inputValue = e;
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: inputValue,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newPeriodeEnd">Periode End</Label>
              <DatePicker
                placeholderText="dd-mm-yyyy"
                dateFormat="dd-MMM-y"
                className={`form-control datepicker-table2`}
                selected={formValue.periodeEnd}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(e) => {
                  const inputValue = e;
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: inputValue,
                    allowance: convertTZ(
                      moment(inputValue).add(3, "M"),
                      "Asia/Jakarta"
                    ),
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
                minDate={new Date()}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="newAllowance">Allowance</Label>
              <DatePicker
                placeholderText="dd-mm-yyyy"
                dateFormat="dd-MMM-y"
                className={`form-control datepicker-table2`}
                selected={formValue.allowance}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(e) => {
                  const inputValue = e;
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: inputValue,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="col-12 m-0 p-0">
            <FormGroup>
              <Label for="noteToVendor">Note To Vendor</Label>
              <Input
                id="noteToVendor"
                name="noteToVendor"
                placeholder="Placeholder"
                type="textarea"
                onChange={(value) => {
                  const inputValue = value.target.value;
                  setFormValue({
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: uom?.value ?? "",
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: inputValue,
                    dueDateResponse: formValue.dueDateResponse,
                  });
                }}
              />
            </FormGroup>
          </div>
          <div className="row flex col-12 my-3 justify-content-end p-0 m-0">
            <Button.Ripple
              onClick={() => {
                var a = moment(formValue.periodeStart);
                var b = moment(formValue.periodeEnd);
                var c = moment(formValue.allowance);

                if (b.diff(a, "days") < 0) {
                  return infoNotification(
                    "Periode end cannot under periode start"
                  );
                }

                if (c.diff(b, "days") < 0) {
                  return infoNotification(
                    "Date allowance cannot under periode end"
                  );
                }

                setRequestBid(
                  {
                    id: moment().format("DDMMMYYHHmmss"),
                    requestBidId: formValue.requestBidId,
                    requestNumber: formValue.requestNumber,
                    vendorId: formValue.vendorId,
                    vendorName: formValue.vendorName,
                    vendorEmail: formValue.vendorEmail,
                    manufacture: formValue.manufacture,
                    qty: formValue.qty,
                    uom: formValue.uom,
                    periodeStart: formValue.periodeStart,
                    periodeEnd: formValue.periodeEnd,
                    allowance: formValue.allowance,
                    noteToVendor: formValue.noteToVendor,
                    dueDateResponse: formValue.dueDateResponse,
                  },
                  formRequestBid,
                  (data) => {
                    setFormValue({
                      requestBidId: formRequestBid.id,
                      requestNumber: formRequestBid.requestNumber,
                      vendorId: "",
                      vendorName: "",
                      vendorEmail: "-",
                      manufacture: "",
                      qty: "",
                      uom: formValue.uom,
                      periodeStart: "",
                      periodeEnd: "",
                      allowance: "",
                      noteToVendor: "",
                      dueDateResponse: "-",
                    });
                    toggle();
                    dispatch(actionSetRequestBid(data));
                  }
                );
              }}
              color="success"
              className="px-2 mt-0 mt-sm-0 col-12 col-sm-3"
            >
              Continue
            </Button.Ripple>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalNewRequest;
