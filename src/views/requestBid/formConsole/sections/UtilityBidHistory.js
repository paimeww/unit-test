import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { Input } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getFormRequestBid } from "redux/middlewares/getFormRequestBid";
import {
  actionClearRequestBid,
  actionSetFilterRequestBid,
} from "redux/actions/requestBid/getFormRequestBid";
import OptionRequestNumberRB from "../components/OptionRequestNumberRB";

const MySwal = withReactContent(Swal);

const UtilityBidHistory = ({ token }) => {
  const dispatch = useDispatch();
  const stateFilter = useSelector((state) => state.listRequestBid.filter);
  const dataRequestBid = useSelector((state) => state.listRequestBid.response);

  return (
    <React.Fragment>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-between mt-1"
          xl="6"
          md="6"
          sm="6"
        >
          <div className="col-12 m-0 p-0">
            <Col className={"m-0 p-0 mb-1"} xl="6" md="6" sm="6">
              <strong className="">No. Request</strong>
              <OptionRequestNumberRB
                showOption={false}
                clearable={false}
                disable={false}
                loading={false}
                token={token}
                rtl={false}
                searchable={true}
                onChange={(value) => {
                  dispatch(actionClearRequestBid());
                  dispatch(
                    actionSetFilterRequestBid({
                      noRequestValue: value?.value ?? "",
                      genericNameValue: stateFilter?.genericNameValue ?? "",
                      totalShow: stateFilter?.totalShow ?? "5",
                      filter: stateFilter?.filter ?? "",
                      keyword: stateFilter?.keyword ?? "",
                      page: stateFilter?.page ?? "1",
                    })
                  );
                  dispatch(getFormRequestBid(token));
                }}
              />
            </Col>
            <Col className={"m-0 p-0 mb-1"} xl="6" md="6" sm="6">
              <strong className="">Generic Name</strong>
              <Input
                className="genericName-table2"
                type="text"
                name="genericName"
                id="genericName-invoice"
                placeholder={dataRequestBid?.genericName ?? "-"}
                value={dataRequestBid?.genericName ?? "-"}
                disabled
              />
            </Col>
            <Col className={"m-0 p-0 mb-1"} xl="6" md="6" sm="6">
              <strong className="">Status</strong>
              <Input
                className="status-table2"
                type="text"
                name="status"
                id="status-invoice"
                placeholder={dataRequestBid?.status ?? "-"}
                value={dataRequestBid?.status ?? "-"}
                disabled
              />
            </Col>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(UtilityBidHistory);
