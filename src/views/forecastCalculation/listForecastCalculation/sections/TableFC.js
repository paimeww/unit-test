import { FormGroup, CustomInput, Badge } from "reactstrap";
import { Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import moment from "moment";
import PaginateFC from "../components/PaginationFC";
import { useSelector } from "react-redux";
import UtilityFC from "./UtilityFC";
import styles from "styles/request_forecast/scrollbar.module.css";
import BasicSkeleton from "components/Skeleton/BasicSkeleton";

const TableFC = (props) => {
  const { listFC, sessionData, userRoles } = props;
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const stateFilter = useSelector((state) => state.listFC.filter);
  const stateRedux = useSelector((state) => state.listFC);

  useEffect(() => {
    setIsCheck([]);
  }, [stateFilter?.page]);

  return (
    <React.Fragment>
      <UtilityFC
        sessionData={sessionData}
        isCheck={isCheck}
        isCheckAll={isCheckAll}
        listFC={listFC}
        userRoles={userRoles}
        callbackChecklist={() => {
          setIsCheck([]);
          setIsCheckAll(false);
        }}
      />
      <br />
      {stateRedux.loading && <BasicSkeleton />}
      {!stateRedux.loading && stateRedux.response != null && (
        <div id={styles.Table}>
          <Table className="table border text-nowrap">
            <thead>
              <tr>
                <th className="text-center px-2 align-middle py-2">
                  <FormGroup className="mb-0">
                    <CustomInput
                      inline
                      type="checkbox"
                      id="checkAllFC"
                      label=""
                      checked={isCheckAll}
                      onChange={(e) => {
                        if (isCheckAll) {
                          setIsCheck([]);
                          setIsCheckAll(false);
                        } else {
                          setIsCheck(listFC);
                          setIsCheckAll(true);
                        }
                      }}
                    />
                  </FormGroup>
                </th>
                <th className="text-left px-2 align-middle py-2">
                  <div style={{ marginLeft: 6 }}>NO. REQUEST</div>
                </th>
                <th className="text-left align-middle py-2">GENERIC NAME</th>
                <th className="text-left align-middle py-2">SITE</th>
                <th className="text-left align-middle py-2">ORG CODE</th>
                <th className="text-left align-middle py-2">ITEM CODE</th>
                <th className="text-left align-middle py-2">
                  ITEM DESCRIPTION
                </th>
                <th className="text-left align-middle py-2">REQUEST DATE</th>
                <th className="text-left align-middle py-2">
                  PERIODE KONTRAK START
                </th>
                <th className="text-left align-middle py-2">
                  PERIODE KONTRAK END
                </th>
                <th className="text-left align-middle py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {(listFC ?? []).map((item, index) => {
                const dataExist = isCheck.filter(
                  (element) => element.id == item.id
                );

                // console.log(moment(item.createdDate).format("YYYY MMM DD HH:mm:ss"));
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center" }}>
                      <FormGroup
                        style={{ zIndex: 0, position: "relative", left: 10 }}
                        className="mb-0"
                      >
                        <CustomInput
                          style={{
                            zIndex: -5,
                            position: "relative",
                            left: 10,
                          }}
                          inline
                          type="checkbox"
                          id={item.id}
                          checked={dataExist.length > 0}
                          onChange={(e) => {
                            if (dataExist.length > 0) {
                              const dataRemove = isCheck.filter(
                                (element) => element.id != item.id
                              );
                              setIsCheckAll(false);
                              setIsCheck(dataRemove);
                            } else {
                              setIsCheck([...isCheck, item]);
                            }
                          }}
                          label=""
                        />
                      </FormGroup>
                    </td>
                    <td style={{ textAlign: "left" }}>{item.requestNumber}</td>
                    <td style={{ textAlign: "left" }}>{item.genericName}</td>
                    <td style={{ textAlign: "left" }}>{item.site}</td>
                    <td className={styles.text} style={{ textAlign: "left" }}>
                      {item.orgCode}
                    </td>
                    <td className={styles.text} style={{ textAlign: "left" }}>
                      {item.itemCode}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      {item.itemDescription}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(item.requestDate).format("DD-MMM-YYYY")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(item.periodeStart).format("DD-MMM-YYYY")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(item.periodeEnd).format("DD-MMM-YYYY")}
                    </td>
                    <td style={{ textAlign: "left" }}>
                      <Badge color="primary" pill>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {!stateRedux.loading && stateRedux.response != null && (
        <PaginateFC sessionData={sessionData} userRoles={userRoles} />
      )}
    </React.Fragment>
  );
};

export default React.memo(TableFC);
