import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
import { Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import { useDispatch } from "react-redux";
import { getFormRequestBid } from "redux/middlewares/getFormRequestBid";
import {
  proccedRequestBid,
  updateRequestBid,
  validateFormRB,
} from "helpers/requestBid";
import moment from "moment";
import { MoreVertical, Trash, XCircle } from "react-feather";
import { actionSetRequestBid } from "redux/actions/requestBid/getFormRequestBid";
import styles from "styles/request_forecast/scrollbar.module.css";
const MySwal = withReactContent(Swal);

const TableBidForContract = ({
  uom,
  formRequestBid,
  token,
  userRoles,
  totalQty,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingAsDraft, setLoadingAsDraft] = useState(false);
  useEffect(() => {}, []);

  const roleIsNegMgr = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Spv"
  );

  const roleIsNegSrMng = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Mgr"
  );

  const isCanProcced = roleIsNegMgr.length > 0 || roleIsNegSrMng.length > 0;

  const confirmAlertProcced = () => {
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
            setLoadingApprove(true);
            try {
              proccedRequestBid(uom, totalQty, token, formRequestBid, () => {
                setLoadingApprove(false);
                dispatch(getFormRequestBid(token));
              });
            } catch (error) {
              setLoadingApprove(false);
            }
          }}
          title={"Proceed to Vendor"}
          description={"Are you sure want to process this request bid?"}
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

  const confirmAlertSaveDraft = () => {
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
            setLoadingAsDraft(true);
            try {
              updateRequestBid(uom, totalQty, token, formRequestBid, () => {
                setLoadingAsDraft(false);
                dispatch(getFormRequestBid(token));
              });
            } catch (error) {
              setLoadingAsDraft(false);
            }
          }}
          title={"Save as draft"}
          description={"Are you sure want to save this data?"}
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

  const confirmAlertDelete = (item) => {
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
            try {
              var data = formRequestBid?.requestBidContracts ?? [];
              var filterData = data.filter((element) => element.id != item.id);

              var dataResult = {
                requestNumber: formRequestBid.requestNumber,
                genericName: formRequestBid.genericName,
                totalQuantity: formRequestBid.totalQuantity,
                uom: formRequestBid.uom,
                periodeStart: formRequestBid.periodeStart,
                periodeEnd: formRequestBid.periodeEnd,
                status: formRequestBid.status,
                requestBidHistorys: formRequestBid.requestBidHistorys,
                requestBidConsoles: formRequestBid.requestBidConsoles,
                requestBidContracts: filterData,
                id: formRequestBid.id,
                createdBy: formRequestBid.createdBy,
                createdByName: formRequestBid.createdByName,
                createdDate: formRequestBid.createdDate,
                isDeleted: formRequestBid.isDeleted,
              };

              dispatch(actionSetRequestBid(dataResult));
            } catch (error) {
              console.log(error.message);
            }
          }}
          newButton={true}
          title={"Are you sure "}
          description={"Are you sure want to delete this row data?"}
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
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              {formRequestBid?.status != "Proceed To Vendor" && (
                <th className="text-center align-middle py-2">Action</th>
              )}
              <th className="text-left align-middle py-2">VENDOR</th>
              <th className="text-left align-middle py-2">MANUFACTURE</th>
              <th className="text-left align-middle py-2">QTY</th>
              <th className="text-left align-middle py-2">UOM</th>
              <th className="text-left align-middle">PERIODE START</th>
              <th className="text-left align-middle">PERIODE END</th>
              <th className="text-left align-middle">ALLOWANCE</th>
              <th className="text-left align-middle">NOTE TO VENDOR</th>
              <th className="text-left align-middle">DUE DATE RESPONSE</th>
            </tr>
          </thead>
          <tbody>
            {(formRequestBid?.requestBidContracts ?? []).map((item, index) => {
              return (
                <tr key={item.id}>
                  {formRequestBid?.status != "Proceed To Vendor" && (
                    <td style={{ textAlign: "center" }}>
                      <Button
                        color="danger"
                        className="p-0 m-0 px-1 mr-1"
                        id={"CloseToolTip" + item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          confirmAlertDelete(item);
                        }}
                      >
                        <Trash
                          style={{ marginBottom: 4, marginTop: 4 }}
                          className=""
                          color="white"
                          size={15}
                        />
                      </Button>
                      <UncontrolledTooltip
                        placement="right"
                        target={"CloseToolTip" + item.id}
                      >
                        Delete
                      </UncontrolledTooltip>
                    </td>
                  )}
                  <td style={{ textAlign: "left" }}>{item.vendorName}</td>
                  <td style={{ textAlign: "left" }}>{item.manufacture}</td>
                  <td style={{ textAlign: "rigth" }}>{item.qty}</td>
                  <td style={{ textAlign: "left" }}>{item.uom}</td>
                  <td style={{ textAlign: "center" }}>
                    {moment(item.periodeStart).format("DD-MMM-YYYY")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {moment(item.periodeEnd).format("DD-MMM-YYYY")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {moment(item.allowance).format("DD-MMM-YYYY")}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.noteToVendor}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.dueDateResponse
                      ? item.dueDateResponse.length <= 1
                        ? "-"
                        : moment(item.dueDateResponse).format("DD-MMM-YYYY")
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {formRequestBid && isCanProcced && (
        <React.Fragment>
          {formRequestBid?.status != "Proceed To Vendor" &&
            uom.uom.length > 0 && (
              <Row className="d-flex justify-content-start align-items-start mt-5 mb-5 px-1">
                <div className="row px-1">
                  {!loadingAsDraft && (
                    <Button
                      onClick={() => {
                        validateFormRB(uom, () => confirmAlertSaveDraft());
                      }}
                      outline
                      color="success"
                    >
                      Save as Draft
                    </Button>
                  )}
                  {loadingAsDraft && (
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
                <div className="row px-1 ml-2">
                  {!loadingApprove && (
                    <Button.Ripple
                      onClick={() => {
                        validateFormRB(uom, () => confirmAlertProcced());
                      }}
                      color="success"
                      className="px-2 mt-0 mt-sm-0 col-12 col-sm-auto"
                    >
                      Proceed to Vendor
                    </Button.Ripple>
                  )}
                  {loadingApprove && (
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
            )}
          {formRequestBid?.status == "Proceed To Vendor" && (
            <React.Fragment>
              <br />
              <br />
              <br />
              <br />
              <br />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default React.memo(TableBidForContract);
