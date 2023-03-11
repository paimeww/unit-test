import { Badge } from "reactstrap";
import { Table } from "reactstrap";
import React, { useEffect } from "react";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import SuccessNotification from "components/Alert/SuccessNotification";
import styles from "styles/request_forecast/scrollbar.module.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { ascByApprovalLevel } from "helpers/sortedArray";
import { useRouter } from "next/router";
import moment from "moment";
import { useState } from "react";

const MySwal = withReactContent(Swal);

const TableDetailMCA = () => {
  useEffect(() => {
    setDetailCA();
  }, []);

  const [listDetailCA, setListDetailCA] = useState();
  const route = useRouter();

  const stateListCA = useSelector(
    (state) => state.contractApproval?.response?.data ?? []
  );

  const setDetailCA = () => {
    var detail = localStorage.getItem("detailCA");
    const dataListDetailCA = (stateListCA ?? []).filter((element) => {
      return element.contractNumber == route.query.id;
    });
    localStorage.setItem(
      "detailCA",
      JSON.stringify(
        dataListDetailCA.length > 0 ? dataListDetailCA : JSON.parse(detail)
      )
    );
    setListDetailCA(
      dataListDetailCA.length > 0 ? dataListDetailCA : JSON.parse(detail)
    );
  };

  const stateListPA = useSelector((state) => state.listPA?.response ?? []);
  const stateLoadingPA = useSelector((state) => state.listPA?.loading ?? []);
  console.log(stateLoadingPA);

  const showWarningNotification = () => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={"Attention"}
          description={"Please check, another bid response need your decision"}
          color={"warning"}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const confirmAlert = () => {
    MySwal.close();
    return MySwal.fire({
      position: "center",
      html: (
        <ConfirmAlert
          onClose={() => {
            MySwal.close();
          }}
          onConfirm={() => {
            showWarningNotification();
          }}
          title={"Are you sure ?"}
          description={"Are you sure want to close this contract approval ?"}
          color={"warning"}
          newButton={true}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  return (
    <React.Fragment>
      {stateLoadingPA && <BasicSkeleton />}
      {!stateLoadingPA && (
        <React.Fragment>
          <div id={styles.Table}>
            <Table className="table border text-nowrap">
              <thead>
                <tr>
                  <th className="text-center px-2 align-middle py-2">
                    NO. REQUEST
                  </th>
                  <th className="text-center align-middle py-2">
                    NO. CONTRACT
                  </th>
                  <th className="text-center align-middle py-2">ITEM NAME</th>
                  <th className="text-center align-middle py-2">MANAFACTURE</th>
                  <th className="text-center align-middle py-2">VENDOR</th>
                  <th className="text-center align-middle py-2">
                    PERIODE START
                  </th>
                  <th className="text-center align-middle py-2">PERIODE END</th>
                  <th className="text-center align-middle py-2">
                    STATUS APPROVAL
                  </th>
                  <th className="text-center align-middle py-2">
                    STATUS CONTRACT
                  </th>
                </tr>
              </thead>
              <tbody>
                {(listDetailCA ?? []).map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>
                        {item.requestNumber}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.contractNumber ? item.contractNumber : "-"}
                      </td>
                      <td style={{ textAlign: "left" }}>{item?.genericName}</td>
                      <td style={{ textAlign: "left" }}>
                        {item?.manufacturer}
                      </td>
                      <td style={{ textAlign: "left" }}>{item.vendorName}</td>
                      <td style={{ textAlign: "left" }}>
                        {moment(item.bidPeriodeStart).format("DD-MMM-YYYY")}
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {moment(item.bidPeriodeEnd).format("DD-MMM-YYYY")}
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <Badge color="primary" pill>
                          {item.status ?? "-"}
                        </Badge>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <Badge style={{ minWidth: 60 }} color="secondary" pill>
                          {item.statusContract ?? "-"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <br />
          <br />
          <br />
          <div id={styles.Table}>
            <Table className="table border text-nowrap">
              <thead>
                <tr>
                  <th className="text-center px-2 align-middle py-2">NO.</th>
                  <th className="text-center align-middle py-2">NAME PIC</th>
                  <th className="text-center align-middle py-2">EMAIL PIC</th>
                  <th className="text-center align-middle py-2">ROLE</th>
                  <th className="text-center align-middle py-2">
                    APPROVE DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {ascByApprovalLevel(stateListPA ?? []).map((item, index) => {
                  console.log(item, "ITEM LIST");
                  if (item.pic != "-") {
                    return (
                      <tr key={item.id}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "left" }}>{item.picName}</td>
                        <td style={{ textAlign: "left" }}>{item.picEmail}</td>
                        <td style={{ textAlign: "left" }}>{item.text}</td>
                        <td
                          style={{ textAlign: "center" }}
                          className={`${
                            item?.actionDate
                              ? item?.actionDate.length > 0
                                ? "bg-success"
                                : "bg-danger"
                              : "bg-danger"
                          } text-white`}
                        >
                          {/* {moment(item.actionDate)} */}
                          {/* {moment(item.actionDate).format(
                            "DD MMMM YYYY - HH:mm:ss"
                          )} */}
                          {item.actionDate
                            ? moment(item.actionDate).format(
                                "DD MMMM YYYY - HH:mm:ss"
                              )
                            : ""}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default React.memo(TableDetailMCA);
