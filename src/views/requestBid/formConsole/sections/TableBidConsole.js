import { Row, Col, Input, FormGroup, Label } from "reactstrap";
import { Table } from "reactstrap";
import React, { useEffect } from "react";
import moment from "moment";
import styles from "styles/request_forecast/scrollbar.module.css";
import OptionListUom from "../components/OptionListUom";
import { thousandFormat } from "helpers/utils";

const TableBidConsole = ({ formRequestBid, onChange, totalQty, uom }) => {
  const isDisableUom =
    formRequestBid?.status == "Proceed To Vendor" ||
    (formRequestBid?.requestBidContracts ?? []).length > 0;

  useEffect(() => {
    if ((formRequestBid?.requestBidContracts ?? []).length > 0) {
      onChange({
        value: formRequestBid.requestBidContracts[0].uom,
        label: formRequestBid.requestBidContracts[0].uom,
        uom: formRequestBid.requestBidContracts[0].uom,
      });
    }
    return () => {};
  }, [formRequestBid?.status, formRequestBid?.requestBidContracts]);

  return (
    <React.Fragment>
      <br />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              <th className="text-left align-middle py-2">ITEM CODE</th>
              <th className="text-left align-middle py-2">ITEM DESCRIPTION</th>
              <th className="text-left align-middle py-2">MANUFACTURE</th>
              <th className="text-left align-middle py-2">SITE</th>
              <th className="text-left align-middle">UOM</th>
              <th className="text-left align-middle">QTY</th>
            </tr>
          </thead>
          {formRequestBid && (
            <tbody>
              {(formRequestBid.requestBidConsoles ?? []).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "left" }}>{item.itemCode}</td>
                    <td style={{ textAlign: "left" }}>
                      {item.itemDescription}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.manufacture}</td>
                    <td style={{ textAlign: "left" }}>{item.site}</td>
                    <td style={{ textAlign: "left" }}>{item.uom}</td>
                    <td style={{ textAlign: "right" }}>
                      {thousandFormat(item.contractQty)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
      {formRequestBid && (
        <Row className="d-flex justify-content-center align-items-start mt-5">
          <Col md={6}>
            <div className="col-8">
              <FormGroup>
                <Label className="font-weight-bold" for="itemName">
                  Total QTY PPIC
                </Label>
                <Input
                  style={{ textAlign: "right" }}
                  id="itemName"
                  name="itemName"
                  placeholder={thousandFormat(totalQty)}
                  value={thousandFormat(totalQty)}
                  type="text"
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-8">
              <FormGroup>
                <Label className="font-weight-bold" for="itemName">
                  Periode Start
                </Label>
                <Input
                  id="itemName"
                  name="itemName"
                  placeholder={moment(formRequestBid.periodeStart).format(
                    "DD-MMM-YYYY"
                  )}
                  value={moment(formRequestBid.periodeStart).format(
                    "DD-MMM-YYYY"
                  )}
                  type="text"
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-8">
              <FormGroup>
                <Label className="font-weight-bold" for="itemName">
                  Periode End
                </Label>
                <Input
                  id="itemName"
                  name="itemName"
                  placeholder={moment(formRequestBid.periodeEnd).format(
                    "DD-MMM-YYYY"
                  )}
                  value={moment(formRequestBid.periodeEnd).format(
                    "DD-MMM-YYYY"
                  )}
                  type="text"
                  disabled
                />
              </FormGroup>
            </div>
          </Col>
          <div className="col-12 col-md-6 mt-3 mt-md-0">
            <div className="col-8">
              {formRequestBid?.status != "Proceed To Vendor" &&
                (formRequestBid?.requestBidContracts ?? []).length == 0 && (
                  <FormGroup>
                    <Label className="font-weight-bold" for="exampleSelect">
                      UOM Contract
                    </Label>
                    <OptionListUom
                      defaultValue={uom}
                      onChange={onChange}
                      listBidConsole={formRequestBid.requestBidConsoles ?? []}
                    />
                  </FormGroup>
                )}
              {isDisableUom && (
                <FormGroup>
                  <Label className="font-weight-bold" for="exampleSelect">
                    UOM Contract
                  </Label>
                  <Input
                    id="itemName"
                    name="itemName"
                    placeholder={formRequestBid.requestBidContracts[0].uom}
                    value={formRequestBid.requestBidContracts[0].uom}
                    type="text"
                    disabled
                  />
                </FormGroup>
              )}
            </div>
          </div>
        </Row>
      )}
    </React.Fragment>
  );
};

export default React.memo(TableBidConsole);
