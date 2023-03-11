import InfoNotification from "components/Alert/InfoNotification";
import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalNewRequest from "../components/ModalNewRequest";

const MySwal = withReactContent(Swal);

const UtilityBidForContract = ({ formRequestBid, userRoles, uom }) => {
  const [visible, setVisible] = useState(false);

  const infoNotification = (error) => {
    return MySwal.fire({
      position: "center",
      html: (
        <InfoNotification
          title={"Info"}
          description={error}
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const roleIsNegMgr = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Spv"
  );

  const roleIsNegSrMng = (userRoles ?? []).filter(
    (element) => element.role.name == "Nego Mgr"
  );

  const isCanProcced = roleIsNegMgr.length > 0 || roleIsNegSrMng.length > 0;

  return (
    <React.Fragment>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-between mt-5"
          xl="12"
          md="12"
          sm="12"
        >
          <div className="col-12 m-0 p-0">
            <Col className={"m-0 p-0 mb-1"} xl="6" md="6" sm="6">
              <h3 className="">Request Bid For Contract</h3>
            </Col>
            <div className="row px-1 d-flex justify-content-between">
              <div className="row px-1">
                {isCanProcced &&
                  formRequestBid?.status != "Proceed To Vendor" &&
                  uom?.value.length > 0 &&
                  uom?.value != "Select..." && (
                    <Button.Ripple
                      onClick={() => {
                        if (uom?.value.length > 0) {
                          setVisible(!visible);
                        } else {
                          infoNotification("uom field is required!");
                        }
                      }}
                      disabled={
                        uom?.value.length == 0 || uom?.value == "Select..."
                      }
                      color="success"
                      className="px-2 mt-0 mt-sm-0 col-12 col-sm-auto"
                    >
                      Add New Request
                    </Button.Ripple>
                  )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {formRequestBid && (
        <ModalNewRequest
          toggle={() => {
            setVisible(!visible);
          }}
          visible={visible}
          formRequestBid={formRequestBid}
          uom={uom}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(UtilityBidForContract);
