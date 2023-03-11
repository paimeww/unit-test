import axios from "axios";
import WrapperCustomScrollbar from "components/custom/WrapperCustomScrollbar";
import { API_COMMENTS_DEV, API_COMMENT_URL } from "constant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Spinner } from "reactstrap";

function ModalComments({ visible, toggle, itemComment, timeComment }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const getAllComments = (pageComments) => {
    if (timeComment) {
      setLoading(true);
      var data = JSON.stringify({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        systemCode: "Kpartner",
        moduleCode: "Bid Response",
        docNo: itemComment?.responseNumber ?? "",
        comment: "string",
        createdByUpn: "string",
        createdByName: "string",
        createdDate: "string",
        updatedByUpn: "string",
        updatedByName: "string",
        updatedDate: "string",
        tipe: "string",
      });

      var config = {
        method: "get",
        url: `${API_COMMENTS_DEV}/api/comment`,
        headers: {
          // "X-FILTER":
          //   "systemCode=Kpartner|moduleCode=Bid Response|documentNumber=2022/07/CPRO-BR/00060" +
          //     itemComment?.responseNumber ?? "",
          "X-FILTER":
            "SystemCode=KPartner|ModuleCode=EC-BidResponse|DocumentNumber=" +
              itemComment?.responseNumber ?? "",
          "X-PAGINATION": "true",
          "X-PAGE": pageComments ? pageComments.toString() : page.toString(),
          "X-PAGESIZE": "5",
          "X-ORDERBY": "createdDate desc",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          if (response.data.data.length < 5) {
            setIsShowButton(false);
          }
          var list = [...comments, ...response.data.data];
          setComments(list);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getAllComments();
    return () => {};
  }, [itemComment, timeComment]);

  return (
    <div className="">
      <Modal
        isOpen={visible}
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
        toggle={() => {
          setIsShowButton(true);
          setComments([]);
          setPage(1);
          toggle();
        }}
        className={"pr-2 pr-md-0 pl-sm-2 pl-md-0"}
        centered={true}
      >
        <ModalHeader
          className="bg-success"
          toggle={() => {
            setIsShowButton(true);
            setComments([]);
            setPage(1);
            toggle();
          }}
        >
          <span className="text-white">Comment Logs</span>
        </ModalHeader>
        <ModalBody style={{ height: 480 }}>
          <React.Fragment>
            <div style={{ top: -300 }}>
              <div
                style={{ height: 480 }}
                className="d-flex flex-column justify-content-start mt-1"
              >
                <WrapperCustomScrollbar showHorizontalScroll={false}>
                  {(comments ?? []).map((item) => {
                    return (
                      <div className="row pl-1 border-bottom mb-2">
                        <div className="col-12 row">
                          <div className="col-12 col-sm-2 flex d-flex justify-content-sm-center m-0 p-0">
                            <small className="font-weight-bold">
                              {item.createdByName}
                            </small>
                          </div>
                          <div className="col-12 col-sm-3 flex d-flex justify-content-sm-center m-0 p-0">
                            <small className="">
                              {moment(item.createdDate).format("DD-MM-YYYY")}
                            </small>
                          </div>
                          <div className="col-12 col-sm-1 flex d-flex justify-content-sm-center m-0 p-0 pr-2">
                            <small className="">
                              {moment(item.createdDate).format("hh:mm")}
                            </small>
                          </div>
                          <div className="col-12 col-sm-6 flex d-flex justify-content-sm-center mt-1 mt-sm-0 m-0 p-0">
                            <p
                              style={{ fontSize: 12 }}
                              className="text-justify"
                            >
                              {item.commentValue}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </WrapperCustomScrollbar>
                <br />
                <div className="">
                  {loading && (
                    <center>
                      <Spinner color="primary" />
                    </center>
                  )}
                  {isShowButton && !loading && (
                    <Button.Ripple
                      onClick={() => {
                        setPage(page + 1);
                        getAllComments(page + 1);
                      }}
                      color="success"
                      className="col-12"
                    >
                      Load More
                    </Button.Ripple>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalComments;
