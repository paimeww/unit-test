import { Row, Col, FormGroup, CustomInput, Button } from "reactstrap";
import Card from "reactstrap/lib/Card";
import ReactPaginate from "react-paginate";
import { TabContent, TabPane, Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/request_forecast/scrollbar.module.css";

const TableWorklistCA = (props) => {
  const { contractApproval, sessionData, userRoles } = props;
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <br />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              <th className="text-center px-2 align-middle py-2">SUBJECT</th>
              <th className="text-center align-middle py-2">SEND DATE</th>
              <th className="text-center align-middle py-2">DUE DATE</th>
            </tr>
          </thead>
          <tbody>
            {(contractApproval?.data ?? []).map((item, index) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <Link href={"/contract_approval/view_detail_vendor/" + "1"}>
                      <a>Desk Subject</a>
                    </Link>
                  </td>
                  <td style={{ textAlign: "center" }}>12-Des-2022</td>
                  <td style={{ textAlign: "center" }}>12-Des-2022</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row className="mb-2 mt-3 justify-content-between align-items-center">
        <Col className="mb-2 mb-md-0" sm="12" md="5">
          <p
            className="mb-0 text-center text-md-left"
            style={{ color: "#b9b9c3" }}
          >
            Showing 1 to 10 of 29 entries
          </p>
        </Col>
        <Col sm="12" md="5">
          <ReactPaginate
            pageCount="5"
            nextLabel={""}
            breakLabel={"..."}
            activeClassName={"active"}
            pageClassName={"page-item"}
            previousLabel={""}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next-item"}
            previousClassName={"page-item prev-item"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName={
              "pagination react-paginate m-0 justify-content-center justify-content-lg-end"
            }
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(TableWorklistCA);
