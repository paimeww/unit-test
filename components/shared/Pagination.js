import ReactPaginate from "react-paginate";

const Pagination = ({ totalPage, pageNumber, handlePagination }) => {
  return (
    <ReactPaginate
      pageCount={totalPage || 1}
      nextLabel=""
      breakLabel="..."
      previousLabel=""
      activeClassName="active"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      forcePage={pageNumber - 1}
      onPageChange={(page) => handlePagination(page)}
      pageClassName={"page-item"}
      nextLinkClassName={"page-link"}
      nextClassName={"page-item next"}
      previousClassName={"page-item prev"}
      previousLinkClassName={"page-link"}
      pageLinkClassName={"page-link"}
      containerClassName={"pagination react-paginate justify-content-end p-1"}
    />
  );
};

export default Pagination;
