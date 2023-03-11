import React from "react";
import { Row, Col } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UtilityBidConsole = () => {
  return (
    <React.Fragment>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-between mt-5"
          xl="6"
          md="6"
          sm="6"
        >
          <div className="col-12 m-0 p-0">
            <Col className={"m-0 p-0 mb-1"} xl="6" md="6" sm="6">
              <h3 className="">Console</h3>
            </Col>
          </div>
        </Col>
        <Col xl="6" md="6" sm="6"></Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(UtilityBidConsole);
