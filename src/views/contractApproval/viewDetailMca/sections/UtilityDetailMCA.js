import React from "react";
import { Row, Col } from "reactstrap";
import { Input, Label, CustomInput, Button } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReviseReasonSubmit from "components/Alert/ReviseReasonSubmit";
import { searchFilterListPA } from "redux/middlewares/getListProgressApproval";
import { ArrowLeft } from "react-feather";
import { useRouter } from "next/router";

const MySwal = withReactContent(Swal);

const UtilityDetailMCA = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Col className="no-gutters p-0 m-0" xl="12" md="12" sm="12">
        <Row className="d-flex no-gutters justify-content-between align-items-end">
          <div className="d-flex align-items-center my-3">
            <Button.Ripple
              outline
              type="submit"
              color="danger"
              className="btn-next"
              onClick={() => router.back()}
            >
              <ArrowLeft size={18} />
              <span className="ml-50 align-middle d-sm-inline-block d-none">
                Back to Previous Page
              </span>
            </Button.Ripple>
            <h2 className="m-0 ml-2 pl-2 border-left-dark">View Detail</h2>
          </div>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default React.memo(UtilityDetailMCA);
