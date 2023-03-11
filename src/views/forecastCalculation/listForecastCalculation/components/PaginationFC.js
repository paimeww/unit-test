import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { actionSetFilterListFC } from "redux/actions/forecastCalculation/index";
import { searchFilterListFC } from "redux/middlewares/searchFilterListFC";

const PaginateFC = ({ sessionData, userRoles }) => {
  const listFC = useSelector((state) => state.listFC.response);
  const stateFilter = useSelector((state) => state.listFC.filter);
  const dispatch = useDispatch();

  return (
    <Row className="mb-2 mt-3 justify-content-between align-items-center">
      <Col className="mb-2 mb-md-0" sm="12" md="5">
        <p
          className="mb-0 text-center text-md-left"
          style={{ color: "#b9b9c3" }}
        >
          Showing {((stateFilter?.page ?? 1) - 1) * 5 + 1} to{" "}
          {((stateFilter?.page ?? 1) - 1) * 5 + listFC.length} of{" "}
          {stateFilter?.totalData ?? 0} entries
        </p>
      </Col>
      <Col sm="12" md="5">
        <ReactPaginate
          onPageChange={(value) => {
            dispatch(
              actionSetFilterListFC({
                GenericName: stateFilter?.GenericName ?? "",
                ItemDescription: stateFilter?.ItemDescription ?? "",
                ItemCode: stateFilter?.ItemCode ?? "",
                RequestNumber: stateFilter?.RequestNumber ?? "",
                Site: stateFilter?.Site ?? "",
                totalShow: stateFilter?.totalShow ?? "5",
                filter: stateFilter?.filter ?? "",
                keyword: stateFilter?.keyword ?? "",
                page: (value.selected + 1).toString(),
              })
            );

            dispatch(
              searchFilterListFC(
                sessionData,
                userRoles,
                stateFilter?.filter ?? "",
                (value.selected + 1).toString()
              )
            );
          }}
          pageCount={stateFilter?.totalPage ?? 1}
          nextLabel={""}
          breakLabel={"..."}
          activeClassName={"active"}
          pageClassName={"page-item"}
          previousLabel={""}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next-item"}
          previousClassName={"page-item prev-item"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          forcePage={parseInt(stateFilter?.page ?? "1") - 1}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={
            "pagination react-paginate m-0 justify-content-center justify-content-lg-end"
          }
        />
      </Col>
    </Row>
  );
};

export default PaginateFC;
