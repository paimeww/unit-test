import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import { Row, Col, Alert, Button } from "reactstrap";
import Breadcrumbs from "components/custom/BreadcrumbCustom";

// ** Invoice Preview Components
import SendInvoiceSidebar from "components/shared-sidebar/SidebarSendInvoice";
import AddPaymentSidebar from "components/shared-sidebar/SidebarAddPayment";
import PreviewActionsCA from "./printsComponents/PreviewActionsCA";
import PreviewCardCA from "./printsComponents/PreviewCardCA";
import { ArrowLeft } from "react-feather";
import { useRouter } from "next/router";

const PrintCAPreview = ({ data, sessionData, userRoles }) => {
  // ** Vars
  // ** States
  const router = useRouter();
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

  return (
    <div className="invoice-preview-wrapper">
      <Breadcrumbs
        breadCrumbTitle="Master"
        breadCrumbParent="Contract Approval"
        breadCrumbActive="Print Out"
        showTitle={false}
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
            <h2 className="m-0 ml-2 pl-2 border-left-dark">PDF Preview</h2>
          </div>
        </Row>
      </Col>
      <Row className="invoice-preview">
        <Col xl={9} md={8} sm={12}>
          <PreviewCardCA data={data} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActionsCA
            id={data.id}
            setSendSidebarOpen={setSendSidebarOpen}
            setAddPaymentOpen={setAddPaymentOpen}
          />
        </Col>
      </Row>
      <SendInvoiceSidebar
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen}
      />
      <AddPaymentSidebar
        toggleSidebar={toggleAddSidebar}
        open={addPaymentOpen}
      />
    </div>
  );
};

export default PrintCAPreview;
