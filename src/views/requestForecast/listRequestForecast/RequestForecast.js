import React from "react";
import HeaderRF from './sections/HeaderRF';
import TableRF from './sections/TableRF';

const RequestForecast = () => {
  return (
    <React.Fragment>
      <HeaderRF />
      <TableRF />
    </React.Fragment>
  );
};

export default React.memo(RequestForecast);
