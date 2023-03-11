import React from "react";
import {
  CustomInput,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  Card,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { MoreHorizontal } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReviseReasonSubmit from "components/Alert/ReviseReasonSubmit";
import ViewComments from "components/Alert/ViewComments";
import OptionSelectSearch from "../components/OptionSelectSearch";

const MySwal = withReactContent(Swal);

const FromGroupBC = () => {
  const showViewComments = () => {
    return MySwal.fire({
      position: "center",
      html: <ViewComments />,
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const showConfirmRevise = () => {
    return MySwal.fire({
      position: "center",
      html: <ReviseReasonSubmit />,
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  return (
    <div className="pl-2 mt-2">
      <Card className="pt-0 col-12 p-4">
        <div className="row px-1">
          <Button.Ripple
            onClick={() => showConfirmRevise()}
            color="success"
            className="px-2 mt-2 mt-sm-0 col-12 col-sm-auto"
          >
            Export to Excel
          </Button.Ripple>
        </div>
        <Form>
          <div className="col-12 col-md-4 p-0 m-0 mb-2 mt-2">
            <FormGroup>
              <Label for="noRequest">No. Request</Label>
              <Input
                id="noRequest"
                name="noRequest"
                placeholder="12345"
                type="number"
                disabled
                value="Placeholder"
              />
            </FormGroup>
          </div>
          <div className="col-12 col-md-4 p-0 m-0 mb-2 mt-2">
            <FormGroup>
              <Label for="itemName">Item Name</Label>
              <Input
                id="itemName"
                name="itemName"
                placeholder="12345"
                type="number"
                disabled
                value="Placeholder"
              />
            </FormGroup>
          </div>
          <div className="col-12 col-md-4 p-0 m-0 mb-2 mt-2">
            <FormGroup>
              <Label for="totalQTY">Total QTY PPIC</Label>
              <Input
                id="totalQTY"
                name="totalQTY"
                placeholder="Placeholder"
                type="number"
                disabled
                value="Placeholder"
              />
            </FormGroup>
          </div>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">No. Response</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Vendor</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Manufacture</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">QTY</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">UOM</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Periode Start</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Periode End</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Delivery Allowance</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Note to Vendor</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <div className="my-2">Total QTY PPIC</div>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Qty Bid</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Bid per UOM</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Currency</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Note</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <br />
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Y-2 MIN</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Y-2 MAX</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Y-2 Last PO</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Y-1 MIN</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Y-1 MAX</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price Y-1 Last PO</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price CY MIN</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price CY MAX</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Price CY Last PO</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <br />
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">EKV Pharma</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">EKV CHD</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                      disabled
                      value="Placeholder"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <br />
          <br />
          <Row className="d-flex justify-content-center align-items-start">
            <Col md={1}>
              <span className="">Alasan Kontrak</span>
            </Col>
            <div className="col-12 col-md-11 mt-3 mt-md-0">
              <CustomInput
                type="checkbox"
                id="single_source"
                label="Single Source"
                className="mb-2"
              />
              <div className="mb-2 row d-flex align-items-center pl-1">
                <CustomInput
                  type="checkbox"
                  id="material_group"
                  label="Kelompok Material"
                  className=""
                />
                <div className="pl-md-4 pl-2 mt-2 mt-md-0 col-12 col-md-auto">
                  <CustomInput
                    type="select"
                    id="exampleCustomSelect"
                    name="customSelect"
                  >
                    <option value="">Select</option>
                    <option>Value 1</option>
                    <option>Value 2</option>
                    <option>Value 3</option>
                    <option>Value 4</option>
                    <option>Value 5</option>
                  </CustomInput>
                </div>
              </div>
              <CustomInput
                type="checkbox"
                id="saving"
                label="Saving"
                className="mb-2"
              />
              <CustomInput
                type="checkbox"
                id="issue_supply"
                label="Issue Supply"
                className="mb-2"
              />
              <CustomInput
                type="checkbox"
                id="single_vendor"
                label="Single Vendor"
                className="mb-2"
              />
              <CustomInput
                type="checkbox"
                id="other"
                label="Other"
                className="mb-2"
              />
              <div className="col-md-2 col-12 pl-2 m-0 p-0">
                <Input
                  id="noRequest"
                  name="noRequest"
                  placeholder="Placeholder"
                  type="number"
                />
              </div>
            </div>
          </Row>
          <br />
          <br />
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Reference Contract</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <OptionSelectSearch
                    showOption={false}
                    clearable={false}
                    disable={false}
                    loading={false}
                    rtl={false}
                    searchable={true}
                  />
                </Col>
                <Col md={4} className="mt-1">
                  <OptionSelectSearch
                    showOption={false}
                    clearable={false}
                    disable={false}
                    loading={false}
                    rtl={false}
                    searchable={true}
                  />
                </Col>
                <Col md={4} className="mt-1">
                  <OptionSelectSearch
                    showOption={false}
                    clearable={false}
                    disable={false}
                    loading={false}
                    rtl={false}
                    searchable={true}
                  />
                </Col>
              </div>
            </div>
          </Row>
          <br />
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">Note Internal</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="number"
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <br />
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={1}>
              <span className="">View Comments</span>
            </Col>
            <div className="col-12 col-md-11">
              <div className="row">
                <Col md={4} className="mt-1">
                  <InputGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="View Comments"
                      type="number"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        onClick={() => {
                          showViewComments();
                        }}
                      >
                        <MoreHorizontal className="feather-more-horizontal" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <InputGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="View Comments"
                      type="number"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText
                        onClick={() => {
                          showViewComments();
                        }}
                      >
                        <MoreHorizontal className="feather-more-horizontal" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
                <Col md={4} className="mt-1">
                  <InputGroup
                    onClick={() => {
                      showViewComments();
                    }}
                  >
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="View Comments"
                      type="number"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <MoreHorizontal className="feather-more-horizontal" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </div>
            </div>
          </Row>
          <br />
          <br />
          <div className="row">
            <div className="col-2"></div>
            <div className="col-md-8 col-12">
              <div className="row justify-content-around">
                <div className="col-md-3 col-12 mb-2">
                  <Button.Ripple
                    onClick={() => showConfirmRevise()}
                    color="success"
                    className="col-12"
                  >
                    Proceed Contract
                  </Button.Ripple>
                </div>
                <div className="col-md-3 col-12 mb-2">
                  <Button.Ripple
                    onClick={() => showConfirmRevise()}
                    color="success"
                    className="col-12"
                  >
                    Proceed Contract
                  </Button.Ripple>
                </div>
                <div className="col-md-3 col-12 mb-2">
                  <Button.Ripple
                    onClick={() => showConfirmRevise()}
                    color="success"
                    className="col-12"
                  >
                    Proceed Contract
                  </Button.Ripple>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="row mt-2">
            <div className="col-2"></div>
            <div className="col-md-8 col-12">
              <div className="row justify-content-around">
                <div className="col-md-3 col-12 mb-2">
                  <Button.Ripple
                    onClick={() => showConfirmRevise()}
                    color="danger"
                    className="col-12"
                  >
                    Reject
                  </Button.Ripple>
                </div>
                <div className="col-md-3 col-12 mb-2">
                  <Button.Ripple
                    onClick={() => showConfirmRevise()}
                    color="danger"
                    className="col-12"
                  >
                    Reject
                  </Button.Ripple>
                </div>
                <div className="col-md-3 col-12 mb-2">
                  <Button.Ripple
                    onClick={() => showConfirmRevise()}
                    color="danger"
                    className="col-12"
                  >
                    Reject
                  </Button.Ripple>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default FromGroupBC;
