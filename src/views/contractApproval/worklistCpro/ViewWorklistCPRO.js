import BasicSkeleton from "components/Skeleton/BasicSkeleton";
import React from "react";
import { useSelector } from "react-redux";
import HeaderWorklistCPRO from "./sections/HeaderWorklistCPRO";
import TableWorklistCPRO from "./sections/TableWorklistCPRO";

const ViewWorklistCPRO = ({ sessionData, userRoles }) => {
  const stateRedux = useSelector((state) => state.contractApproval);

  return (
    <React.Fragment>
      <HeaderWorklistCPRO
        sessionData={sessionData}
        contractApproval={stateRedux.response}
        userRoles={userRoles}
      />
      {stateRedux.response != null && !stateRedux.loading && (
        <TableWorklistCPRO
          sessionData={sessionData}
          contractApproval={stateRedux.response}
          userRoles={userRoles}
        />
      )}
      {stateRedux.loading && <BasicSkeleton />}
    </React.Fragment>
  );
};

export default ViewWorklistCPRO;
