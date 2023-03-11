import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import React from "react";
import { useSelector } from "react-redux";
import HeaderConAp from "./sections/HeaderConAp";
import TableConAp from "./sections/TableConAp";

const ListContractAp = ({ sessionData, userRoles }) => {
  const stateRedux = useSelector((state) => state.contractApproval);

  return (
    <React.Fragment>
      <HeaderConAp
        sessionData={sessionData}
        contractApproval={stateRedux.response}
        userRoles={userRoles}
      />
      {stateRedux.response != null && !stateRedux.loading && (
        <div className="" style={{ minHeight: 500 }}>
          <TableConAp
            sessionData={sessionData}
            contractApproval={stateRedux.response}
            userRoles={userRoles}
          />
        </div>
      )}
      {stateRedux.loading && <BasicSkeleton />}
    </React.Fragment>
  );
};

export default ListContractAp;
