// ** Third Party Components
import { thousandFormat } from "helpers/utils";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap";

const PreviewCardCA = ({ data }) => {
  // uyerName: "KALBE GROUP"
  const filterDataPO =
    data.length > 1
      ? data.filter((element) => element.buyerSite == "KALBEGROUP")
      : data;
  const filterDataBuyer =
    data.length > 1
      ? data.filter((element) => element.buyerSite != "KALBEGROUP")
      : data;

  console.log(data, "filterDataPO");
  function htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return data !== null ? (
    <Card className="invoice-preview-card">
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <center>
          <h4 className="font-weight-bold">SUPPLY CONTRACT</h4>
          <h4 className="font-weight-bold">KALBE GROUP</h4>
          <h4 className="font-weight-bold">
            {filterDataPO[0]?.contractNumber ?? ""}
          </h4>
        </center>
        {/* /Header */}
      </CardBody>
      <br />
      <br />

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0">
        <Row className="invoice-spacing">
          <Col className="p-0" lg="8">
            <h6 className="mb-2">
              This Supply Contract is made on{" "}
              {`${filterDataPO[0]?.contractDate ?? ""}`}, between :
            </h6>
            <h6 className="mb-25">The Buyer</h6>
            {filterDataBuyer.map((item, index) => {
              return (
                <div key={item.id} className="d-flex flex mt-1">
                  <h6 className="p-0 m-0">{index + 1})&nbsp;&nbsp;</h6>
                  <h6 className="mb-25">
                    {item?.buyerName ?? "".length > 0
                      ? item?.buyerName ?? ""
                      : "(Contact Buyer)"}
                    ,{" "}
                    <span className="" style={{ fontWeight: "normal" }}>
                      address :{" "}
                      {item?.buyerAddress ?? "".length > 0
                        ? item?.buyerAddress ?? ""
                        : "(Address Buyer"}
                    </span>
                  </h6>
                </div>
              );
            })}

            <br />
            <h6 className="mb-25">And The Vendor</h6>
            <h6 className="mb-25">
              {filterDataPO[0]?.vendorName ?? "".length > 0
                ? filterDataPO[0]?.vendorName ?? ""
                : "(Contact Vendor)"}
              ,{" address : "}
              {filterDataPO[0]?.vendorAddress ?? "".length > 0
                ? filterDataPO[0]?.vendorAddress ?? ""
                : "(Address Vendor)"}
            </h6>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Content Information */}
      <CardBody className="invoice-padding pt-0">
        <p>
          On the basis of the negotiation and the Vendor’s best and final offer,
          the Buyer has selected the Vendor to supply the material and the
          Vendor undertakes to supply the same on the terms set out in this
          contract.
        </p>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Material Name </div>
          <div className="col-9">: {filterDataPO[0]?.materialName ?? ""}</div>
        </div>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Manufacture </div>
          <div className="col-9">: {filterDataPO[0]?.manufacturer ?? ""}</div>
        </div>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Quantity </div>
          <div className="col-9">
            : {thousandFormat(filterDataPO[0]?.qty ?? "")}{" "}
            {filterDataPO[0]?.uom ?? ""}
          </div>
        </div>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Price </div>
          <div className="col-9">
            :{" "}
            {`${filterDataPO[0]?.currency ?? ""} ${thousandFormat(
              filterDataPO[0]?.pricePerUOM ?? ""
            )}/${filterDataPO[0]?.uom ?? ""} + VAT 11%`}{" "}
          </div>
        </div>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Delivery Periode </div>
          <div className="col-9">
            : {filterDataPO[0]?.deliveryPeriode ?? ""}
          </div>
        </div>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Allowance Delivery </div>
          <div className="col-9">
            : {filterDataPO[0]?.deliveryAllowance ?? ""}
          </div>
        </div>
        <div className="col-9 row p-0 m-0">
          {filterDataBuyer.map((item, index) => {
            return (
              <React.Fragment>
                <div className="col-3 p-0 m-0">
                  {index == 0 ? "Convey the goods to" : ""}{" "}
                </div>
                <div className="col-9">
                  <div style={{ marginLeft: index == 0 ? 0 : 6 }} className="">
                    {index == 0 ? ": " : " "} {item?.conveyGoods ?? ""}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="col-9 row p-0 m-0">
          <div className="col-3 p-0 m-0">Term Of Payment </div>
          <div className="col-9">: {filterDataPO[0]?.termOfPayment ?? ""}</div>
        </div>
        <div
          className="mt-2 text-justify"
          dangerouslySetInnerHTML={{
            __html: (filterDataPO[0]?.noteInternal ?? "").replaceAll(
              "\n",
              "<br />"
            ),
          }}
        />
        <p className="mt-2">
          With all respects if necessary, this Supply Contract will be
          acknowledged as final agreement, thus all the following POs must refer
          and adhere to it.
        </p>
        <div className="">
          Hereinafter, thank you very much for all of your supports and
          participation.
        </div>
        <div>Approved by,</div>
      </CardBody>
      {/* /Content Information */}

      {/* Invoice Note */}
      <CardBody className="invoice-padding pt-0">
        <Row>
          <Col sm="6">
            <div className="font-weight-bold">BUYER </div>
            <div className="font-weight-bold">
              {filterDataPO[0]?.buyerName ?? "".length > 0
                ? filterDataPO[0]?.buyerName ?? ""
                : "-"}{" "}
            </div>
            <img
              src={`data:image/png;base64,${
                filterDataPO[0]?.buyerSignature ?? ""
              }`}
              style={{ height: 80, width: 100, position: "relative", top: 0 }}
              alt="Signed Buyer"
            />
            <div
              className={`font-weight-bold ${
                filterDataPO[0]?.buyerPicName ?? "".length > 0
                  ? "text-dark"
                  : "text-white"
              }`}
              style={{}}
            >
              {" "}
              {filterDataPO[0]?.buyerPicName ?? "".length > 0
                ? filterDataPO[0]?.buyerPicName ?? ""
                : "|"}{" "}
            </div>
            <div
              className=""
              style={{ height: 1, backgroundColor: "black", width: 140 }}
            ></div>
          </Col>
          <Col sm="6">
            <div className="font-weight-bold">VENDOR </div>
            <div className="font-weight-bold">
              {filterDataPO[0]?.vendorName ?? "".length > 0
                ? filterDataPO[0]?.vendorName ?? ""
                : "(Contact Vendor)"}{" "}
            </div>
            <div style={{ height: 80 }}></div>
            <div
              className={`font-weight-bold ${
                filterDataPO[0]?.vendorPicName ?? "".length > 0
                  ? "text-dark"
                  : "text-white"
              }`}
              style={{}}
            >
              {filterDataPO[0]?.vendorPicName ?? "".length > 0
                ? filterDataPO[0]?.vendorPicName ?? ""
                : "|"}
            </div>
            <div
              className=""
              style={{ height: 1, backgroundColor: "black", width: 140 }}
            ></div>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null;
};

export default PreviewCardCA;
