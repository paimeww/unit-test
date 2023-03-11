// export default React.memo(TableBidHistory);
import { TabContent, TabPane, Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "styles/request_forecast/scrollbar.module.css";
import { thousandFormat } from "helpers/utils";

const TableBidHistory = ({ formRequestBid, token }) => {
  const [currentPos, setCurrentPos] = useState(0);
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <br />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              <th className="text-left px-2 align-middle py-2">YEAR</th>
              <th className="text-left align-middle py-2">ITEM CODE</th>
              <th className="text-left align-middle py-2">ITEM DESCRIPTION</th>
              <th className="text-left align-middle py-2">ORG CODE</th>
              <th className="text-left align-middle py-2">MIN PRICE</th>
              <th className="text-left align-middle py-2">MAX PRICE</th>
              <th className="text-left align-middle py-2">CURRENCY</th>
              <th className="text-left align-middle py-2">MANUFACTURE</th>
              <th className="text-left align-middle py-2">QTY RECEIPT</th>
              <th className="text-left align-middle">VENDOR</th>
              <th className="text-left align-middle">LAST PRICE</th>
            </tr>
          </thead>
          {formRequestBid && (
            <tbody>
              {(formRequestBid.requestBidHistorys ?? []).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center" }}>
                      {moment(item.createdDate).format("YYYY")}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.itemCode}</td>
                    <td style={{ textAlign: "left" }}>
                      {item.itemDescription}
                    </td>
                    <td className={styles.text} style={{ textAlign: "left" }}>
                      {item.orgCode}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {thousandFormat(item.minimalPrice)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {thousandFormat(item.maximalPrice)}
                    </td>
                    <td style={{ textAlign: "left" }}>{item.currency}</td>
                    <td style={{ textAlign: "left" }}>{item.manufacture}</td>
                    <td style={{ textAlign: "right" }}>
                      {thousandFormat(item.qtyReceipt)}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.vendor}</td>
                    <td style={{ textAlign: "right" }}>
                      {thousandFormat(item.lastPrice)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
    </React.Fragment>
  );
};

export default React.memo(TableBidHistory);
