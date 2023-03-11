import { Table } from "reactstrap";
import React, { useEffect } from "react";
import styles from "styles/request_forecast/scrollbar.module.css";
import Link from "next/link";
import { getPermissionComponent } from "helpers/getPermission";
import PaginateCA from "../../listContractAp/components/PaginationCA";

const TableInquiryCA = (props) => {
  const { contractApproval, sessionData, userRoles } = props;
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <br />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              <th className="text-center px-2 align-middle py-2">
                NO. CONTRACT
              </th>
              <th className="text-center align-middle py-2">ITEM NAME</th>
            </tr>
          </thead>
          <tbody>
            {(contractApproval?.data ?? []).map((item, index) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "left" }}>
                    {getPermissionComponent([
                      "Super User",
                      "Nego Spv",
                      "Nego Mgr",
                      "Material Planner Mgr",
                      "Material Planner Sr. Mgr",
                      "Supplier",
                      "GSC Deputy Director",
                      "GSC Head",
                    ]) && (
                      <Link
                        href={
                          "/contract_approval/view_detail_vendor/" + item.id
                        }
                      >
                        <a>{item.contractNumber}</a>
                      </Link>
                    )}
                    {!getPermissionComponent([
                      "Super User",
                      "Nego Spv",
                      "Nego Mgr",
                      "Material Planner Mgr",
                      "Material Planner Sr. Mgr",
                      "Supplier",
                      "GSC Deputy Director",
                      "GSC Head",
                    ]) && <span>{item.contractNumber}</span>}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.genericName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <PaginateCA
        sessionData={sessionData}
        userRoles={userRoles}
        inquiry="inquiry"
      />
    </React.Fragment>
  );
};

export default React.memo(TableInquiryCA);
