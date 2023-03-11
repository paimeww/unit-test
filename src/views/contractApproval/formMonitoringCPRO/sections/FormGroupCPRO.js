import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Card,
  Button,
  Spinner,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { thousandFormat } from "helpers/utils";
import moment from "moment";
import SuccessNotification from "components/Alert/SuccessNotification";
import ErrorNotification from "components/Alert/ErrorNotification";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import {
  approveContractApproval,
  getCurrentApproval,
  getDetailContractApproval,
  getListProgressApproval,
} from "helpers/contractApproval";
import { ascByApprovalLevel } from "helpers/sortedArray";
import { getPermissionComponent } from "helpers/getPermission";
import InfoNotification from "components/Alert/InfoNotification";

const MySwal = withReactContent(Swal);

const FromGroupCPRO = ({ sessionData, userRoles, data }) => {
  const [loading, setLoading] = useState(false);
  const [dataApproval, setDataApproval] = useState(data);
  const [showButton, setShowButton] = useState(false);
  const [top, setTop] = useState(dataApproval?.top ?? "");

  const token = sessionData.user.token;

  console.log(sessionData);

  useEffect(() => {
    setDataApproval(data);
    return () => {};
  }, [data]);

  useEffect(() => {
    setStatusShowButton();
    return () => {};
  }, []);

  const showSuccessNotification = () => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={"Approve"}
          description={"Success"}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const errorNotification = (msg) => {
    return MySwal.fire({
      position: "center",
      html: (
        <ErrorNotification
          title={"Error"}
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

  const setStatusShowButton = async () => {
    if (dataApproval?.contractNumber) {
      // var response = await getListProgressApproval(
      //   (dataApproval?.contractNumber ?? "").replaceAll("/", "%2F"),
      //   token
      // );

      var response = await getCurrentApproval(
        (dataApproval?.contractNumber ?? "").replaceAll("/", "%2F"),
        token
      );
      console.log("setStatusShowButton");
      console.log(response);

      var isCanApprove = response.filter(
        (element) =>
          element?.picUserName.toLowerCase() ==
          sessionData.user?.userName.toLowerCase()
      );

      isCanApprove.length > 0 ? setShowButton(true) : setShowButton(false);

      // var dataNotApprove = ascByApprovalLevel(response?.data ?? []).filter(
      //   (element) => {
      //     return (
      //       element.action == null || element.action == undefined
      //       // || element.approveDate.length == 0
      //     );
      //   }
      // );

      // if (dataNotApprove.length > 0) {
      // var groupDataByLevel = response.data.filter(
      //   (element) =>
      //     element.workflow.level == dataNotApprove[0].workflow.level
      // );

      // var isCanApprove = groupDataByLevel.filter(
      //   (element) =>
      //     element?.picUserName.toLowerCase() ==
      //     sessionData.user?.userName.toLowerCase()
      // );

      // setShowButton(isCanApprove.length > 0);
      // } else {
      //   setShowButton(false);
      // }
    }
  };

  const infoNotification = (msg) => {
    return MySwal.fire({
      position: "center",
      html: (
        <ErrorNotification
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
            if (top == null || top.length == 0 || top == 0 || top == "0") {
              return infoNotification(
                "TOP cannot empty or 0 value please fill form input"
              );
            }
            setLoading(true);
            approveContractApproval(
              sessionData,
              dataApproval.id,
              top,
              dataApproval?.supplierTaskId
            )
              .then((response) => {
                if (response) {
                  setShowButton(false);
                  showSuccessNotification();
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              })
              .catch((error) => {
                errorNotification(error.message.toString());
                setLoading(false);
              }); 
          }}
          title={"Approve"}
          description={"Are you sure want to approve this contract?"}
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
    <div className="pl-2 mt-2">
      <Card className="p-4 pt-0 col-12">
        <Form>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">No Request</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.requestNumber ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">No Contract</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.contractNumber ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Site</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.site ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Item Code</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.itemCode ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Item Name</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.genericName ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Manufacture</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.manufacturer ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Vendor</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.vendorName ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">QTY</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={thousandFormat(dataApproval?.bidQty ?? 0)}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">UOM</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.uom ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Price per UOM</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={thousandFormat(dataApproval?.bidPricePerUOM ?? 0)}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Currency</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={dataApproval?.bidCurrency ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Periode Start</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={moment(dataApproval.bidPeriodeStart).format(
                        "DD-MMM-YYYY"
                      )}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Periode End</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={moment(dataApproval.bidPeriodeEnd).format(
                        "DD-MMM-YYYY"
                      )}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Periode Allowance</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={moment(dataApproval.bidDeliveryAllowance).format(
                        "DD-MMM-YYYY"
                      )}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">TOP</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="top"
                      name="top"
                      placeholder="Placeholder"
                      type="text"
                      disabled={!getPermissionComponent(["Nego Mgr"])}
                      value={top}
                      onChange={(data) => {
                        setTop(data.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Alasan Kontrak</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="textarea"
                      disabled
                      value={dataApproval?.alasanKontrak ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Note Internal</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="textarea"
                      disabled
                      value={dataApproval?.noteInternal ?? ""}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <center>
            <div className="p-0 m-0 mt-4 mb-2 row col-md-12 col-12 d-flex justify-content-between">
              <div />
              {!loading &&
                showButton &&
                getPermissionComponent([
                  "Nego Mgr",
                  "Nego Sr. Mgr",
                  "Material Planner Mgr",
                  "Material Planner Sr. Mgr",
                  "GSC Deputy Director",
                  "GSC Head",
                ]) && (
                  <Button.Ripple
                    onClick={() => confirmAlert()}
                    color="success"
                    className=""
                  >
                    Approve
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
                  ></Spinner>
                </Button.Ripple>
              )}
            </div>
          </center>
        </Form>
      </Card>
    </div>
  );
};

export default FromGroupCPRO;
