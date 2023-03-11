import { Row, Col } from "reactstrap";
import ReactPaginate from "react-paginate";
import { Table } from "reactstrap";
import React from "react";
import styles from "styles/request_forecast/scrollbar.module.css";

import Link from "next/link";

const TableWorklistCPRO = (props) => {
  const { contractApproval } = props;

  return (
    <React.Fragment>
      <br />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              <th className="text-center px-2 align-middle py-2">FROM</th>
              <th className="text-center align-middle py-2">SUBJECT</th>
              <th className="text-center align-middle py-2">SEND</th>
            </tr>
          </thead>
          <tbody>
            {(contractApproval?.data ?? []).map((item, index) => {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>Dedi</td>
                  <td style={{ textAlign: "center" }}>
                    <Link href={"/contract_approval/view_detail_cpro/" + "1"}>
                      <a>Desk Subject</a>
                    </Link>
                  </td>
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

export default React.memo(TableWorklistCPRO);
