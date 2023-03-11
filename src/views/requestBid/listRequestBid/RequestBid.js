import React from "react";
import HeaderRB from './sections/HeaderRB';
import TableRB from './sections/TableRB';

const RequestBid = () => {
  return (
    <React.Fragment>
      <HeaderRB />
      <TableRB />
    </React.Fragment>
  );
};

export default React.memo(RequestBid);
