import React from "react";
import HeaderFC from "./sections/HeaderFC";
import TableFC from "./sections/TableFC";
import { useSelector } from "react-redux";
import BasicSkeleton from "components/Skeleton/BasicSkeleton";

const ForecastCalculation = ({ sessionData, userRoles }) => {
  const stateRedux = useSelector((state) => state.listFC);

  return (
    <React.Fragment>
      <HeaderFC sessionData={sessionData} />
      <div className="" style={{ minHeight: 500 }}>
        <TableFC
          sessionData={sessionData}
          listFC={stateRedux.response != null ? stateRedux.response : []}
          userRoles={userRoles}
        />
      </div>
    </React.Fragment>
  );
};

export default React.memo(ForecastCalculation);
