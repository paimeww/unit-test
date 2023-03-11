import React from "react";
import Breadcrumbs from "components/custom/BreadcrumbCustom";
import { Button, Col, Row } from "reactstrap";
import { ArrowLeft } from "react-feather";
import { useRouter } from "next/router";

const HeaderCPRO = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle=""
        breadCrumbParent="Master"
        breadCrumbActive="MyTask Approval Contract CPRO - Detail Worklist"
      />
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
            <h2 className="m-0 ml-2 pl-2 border-left-dark">
              Form MyTask Approval Contract (Detail Worklists)
            </h2>
          </div>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default React.memo(HeaderCPRO);
