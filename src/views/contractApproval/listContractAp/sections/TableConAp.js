import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
import { Table } from "reactstrap";
import React, { useState, useEffect, useRef } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CloseNotification from "components/Alert/CloseNotification";
import moment from "moment";
import PaginateCA from "../components/PaginationCA";
import styles from "styles/request_forecast/scrollbar.module.css";
import Link from "next/link";
import {
  MoreVertical,
  Circle,
  Eye,
  XCircle,
  Download,
  Upload,
  DownloadCloud,
} from "react-feather";
import Uppy from "@uppy/core";
import { XHRUpload } from "uppy";
import { API_FILES_STAGING_URL, API_FILES_URL } from "constant";
import { getFileUploadHeaders } from "helpers/utils";
import SuccessNotification from "components/Alert/SuccessNotification";
import {
  closeContractApproval,
  downloadAs,
  saveContractApproval,
} from "helpers/contractApproval";
import ErrorNotification from "components/Alert/ErrorNotification";
import { getPermissionComponent } from "helpers/getPermission";
import { getListContractApproval } from "redux/middlewares/getListContractApproval";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ConfirmAlert from "components/Alert/ConfirmAlert";

const MySwal = withReactContent(Swal);

const TableConAp = (props) => {
  const { contractApproval, sessionData, userRoles } = props;
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [printOutId, setPrintOutId] = useState(null);
  const [contractNumber, setContractNumber] = useState(null);
  const [idPrintOut, setIdPrintOut] = useState(null);
  const [itemData, setItemData] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const searchContractApproval = () => {
    dispatch(getListContractApproval(sessionData, userRoles));
  };

  const [loadingDelete, setLoadingDelete] = useState(false);

  const showWarningNotification = (id, requestNumber) => {
    return MySwal.fire({
      position: "center",
      html: (
        <CloseNotification
          onClose={() => MySwal.close()}
          onConfirm={() => {
            MySwal.close();
            setLoadingDelete(true);
            closeContractApproval(
              sessionData,
              id,
              requestNumber.replaceAll("/", "%2F")
            )
              .then((response) => {
                if (response) {
                  dispatch(getListContractApproval(sessionData, userRoles));
                  showSuccessNotification("Success", "Close");
                  setLoadingDelete(false);
                } else {
                  setLoadingDelete(false);
                }
              })
              .catch((error) => {
                errorNotification(error.message.toString());
                setLoadingDelete(false);
              });
          }}
          title={"Close"}
          description={"Are you sure want to close this contract approval ?"}
          color={"warning"}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const showSuccessNotification = (msg, title) => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={title ? title : "Success"}
          description={msg}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const errorNotification = (msg) => {
    return MySwal.fire({
      position: "center",
      html: (
        <ErrorNotification
          title={"Error"}
          description={msg}
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
        />
      ),
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      padding: "0",
      allowOutsideClick: false,
    });
  };

  const fileUploadRef = useRef(null);

  const handleUpload = () => {
    fileUploadRef.current.click();
  };

  return (
    <React.Fragment>
      <br />
      <input
        ref={fileUploadRef}
        accept=".pdf"
        style={{ display: "none" }}
        multiple
        name="uppyResult"
        type="file"
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={(e) => {
          const fileData = e.target.files[0];

          const uppyInstance = new Uppy({
            id: "fileUpload",
            restrictions: { maxNumberOfFiles: 1 },
            autoProceed: true,
          })
            .use(XHRUpload, {
              endpoint: `${API_FILES_STAGING_URL}/single?applicationCode=KPARTNER&ModuleCode=EC-ContractApproval`,
              headers: getFileUploadHeaders(),
            })
            .on("file-added", (file) => {
              setLoadingUpload(true);
            })
            .on("upload-success", (file, response) => {
              saveContractApproval(sessionData, itemData, response.body)
                .then((response) => {
                  if (response) {
                    searchContractApproval();
                    showSuccessNotification("Success", "Upload");
                    setLoadingUpload(false);
                  } else {
                    setLoadingUpload(false);
                  }
                })
                .catch((error) => {
                  errorNotification(error.message.toString());
                  setLoadingUpload(false);
                });
            });

          uppyInstance.addFile({
            name: fileData.name,
            type: fileData.type,
            data: fileData,
            source: "Local",
            isRemote: false,
          });

          uppyInstance.upload().then((result) => {
            if (result.failed.length > 0) {
              result.failed.forEach((file) => {});
            }
          });
        }}
      />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              {getPermissionComponent([
                "Nego Spv",
                "Nego Mgr",
                "Material Planner Mgr",
                "Material Planner Sr. Mgr",
                "Supplier",
                "GSC Deputy Director",
                "GSC Head",
              ]) && <th className="text-center align-middle py-2">ACTION</th>}
              <th className="text-left px-2 align-middle py-2">NO. REQUEST</th>
              <th className="text-left align-middle py-2">NO. CONTRACT</th>
              <th className="text-left align-middle py-2">ITEM NAME</th>
              <th className="text-left align-middle py-2">MANAFACTURE</th>
              <th className="text-left align-middle py-2">VENDOR</th>
              <th className="text-left align-middle py-2">PERIODE START</th>
              <th className="text-left align-middle py-2">PERIODE END</th>
              <th className="text-left align-middle py-2">STATUS APPROVAL</th>
              <th className="text-left align-middle py-2">STATUS CONTRACT</th>
            </tr>
          </thead>
          <tbody>
            {(contractApproval?.data ?? []).map((item, index) => {
              var encodeContractNumber = (
                item?.contractNumber ?? ""
              ).replaceAll("/", "%2F");
              return (
                <tr key={item.id}>
                  {getPermissionComponent([
                    "Nego Spv",
                    "Nego Mgr",
                    "Material Planner Mgr",
                    "Material Planner Sr. Mgr",
                    "Supplier",
                    "GSC Deputy Director",
                    "GSC Head",
                  ]) && (
                    <td>
                      <div
                        className="row flex d-flex justify-content-start align-items-center"
                        style={{ width: 300 }}
                      >
                        <Link
                          href={
                            "/contract_approval/view_detail_cpro/" +
                            (item.id ?? "")
                          }
                        >
                          <Button
                            color="primary"
                            className="p-0 m-0 px-1 mr-1"
                            id={"ViewToolTip" + item.id}
                          >
                            <Eye
                              style={{ marginBottom: 4, marginTop: 4 }}
                              className=""
                              color="white"
                              size={15}
                            />
                          </Button>
                        </Link>
                        {(item.status ?? "-") == "Approved Internal" && (
                          <Button
                            color="info"
                            className="p-0 m-0 px-1 mr-1"
                            id={"DownloadUnSignedPrintOut" + item.id}
                            onClick={() => {
                              router.push(
                                "/contract_approval/pdf_preview/" + item.id
                              );
                            }}
                          >
                            <Download
                              style={{ marginBottom: 4, marginTop: 4 }}
                              className=""
                              color="white"
                              size={15}
                            />
                          </Button>
                        )}
                        {item.contractAttachmentId != null && (
                          <React.Fragment>
                            {item.contractAttachmentId.length > 0 &&
                              item.contractAttachmentId !=
                                "00000000-0000-0000-0000-000000000000" &&
                              item.contractAttachmentId.toString() != "null" &&
                              (item.status ?? "-") == "Approved Internal" && (
                                <Button
                                  color="secondary"
                                  className="p-0 m-0 px-1 mr-1"
                                  id={"DownloadSignedPrintOutToolTip" + item.id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    var url =
                                      API_FILES_URL +
                                      `/api/Files/${item.contractAttachmentId}/download`;
                                    downloadAs(
                                      url,
                                      item.contractNumber
                                        ? item.contractNumber
                                        : item.requestNumber
                                    );
                                  }}
                                >
                                  <DownloadCloud
                                    style={{ marginBottom: 4, marginTop: 4 }}
                                    className=""
                                    color="white"
                                    size={15}
                                  />
                                </Button>
                              )}
                          </React.Fragment>
                        )}
                        {loadingUpload && itemData.id == item.id && (
                          <Spinner color="primary" />
                        )}
                        {item.contractNumber &&
                          !loadingUpload &&
                          (item.status ?? "-") == "Approved Internal" && (
                            <Button
                              color="warning"
                              className="p-0 m-0 px-1 mr-1"
                              id={"UploadToolTip" + item.id}
                              onClick={() => {
                                setItemData(item);
                                setContractNumber(item?.contractNumber);
                                handleUpload();
                              }}
                            >
                              <Upload
                                style={{ marginBottom: 4, marginTop: 4 }}
                                className=""
                                color="white"
                                size={15}
                              />
                            </Button>
                          )}
                        {item.statusContract != "Close" && !loadingDelete && (
                          <Button
                            color="danger"
                            className="p-0 m-0 px-1 mr-1"
                            id={"CloseToolTip" + item.id}
                            key={"CloseToolTip" + item.id}
                            onClick={(e) => {
                              e.preventDefault();
                              showWarningNotification(
                                item.id,
                                item.requestNumber
                              );
                            }}
                          >
                            <XCircle
                              style={{ marginBottom: 4, marginTop: 4 }}
                              className=""
                              color="white"
                              size={15}
                            />
                          </Button>
                        )}

                        {loadingDelete && (
                          <Button
                            color="danger"
                            className="m-0 px-1 mr-1"
                            style={{ padding: 4 }}
                            id={"CloseToolTip" + item.id}
                            key={"CloseToolTip" + item.id}
                          >
                            <Spinner
                              animation="border"
                              role="status"
                              size="sm"
                              color="white"
                            ></Spinner>
                          </Button>
                        )}
                        <UncontrolledTooltip
                          placement="right"
                          target={"ViewToolTip" + item.id}
                        >
                          View
                        </UncontrolledTooltip>
                        {item.statusContract != "Close" && (
                          <UncontrolledTooltip
                            placement="right"
                            target={"CloseToolTip" + item.id}
                          >
                            Close
                          </UncontrolledTooltip>
                        )}
                        {(item.status ?? "-") == "Approved Internal" && (
                          <UncontrolledTooltip
                            placement="right"
                            target={"DownloadUnSignedPrintOut" + item.id}
                          >
                            Download UnSigned PrintOut
                          </UncontrolledTooltip>
                        )}
                        {item.contractAttachmentId != null && (
                          <React.Fragment>
                            {item.contractAttachmentId.length > 0 &&
                              item.contractAttachmentId !=
                                "00000000-0000-0000-0000-000000000000" &&
                              item.contractAttachmentId.toString() != "null" &&
                              (item.status ?? "-") == "Approved Internal" && (
                                <UncontrolledTooltip
                                  placement="right"
                                  target={
                                    "DownloadSignedPrintOutToolTip" + item.id
                                  }
                                >
                                  Download Signed PrintOut
                                </UncontrolledTooltip>
                              )}
                          </React.Fragment>
                        )}
                        {item.contractNumber &&
                          (item.status ?? "-") == "Approved Internal" && (
                            <UncontrolledTooltip
                              placement="right"
                              target={"UploadToolTip" + item.id}
                            >
                              Upload
                            </UncontrolledTooltip>
                          )}
                      </div>
                    </td>
                  )}
                  <td style={{ textAlign: "center" }}>{item.requestNumber}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link
                      href={
                        "/contract_approval/view_detial_mca/" +
                        encodeContractNumber
                      }
                    >
                      <a className="">
                        {item.contractNumber ? item.contractNumber : "-"}
                      </a>
                    </Link>
                  </td>
                  <td style={{ textAlign: "left" }}>{item?.genericName}</td>
                  <td style={{ textAlign: "left" }}>{item?.manufacturer}</td>
                  <td style={{ textAlign: "left" }}>{item.vendorName}</td>
                  <td style={{ textAlign: "left" }}>
                    {moment(item.bidPeriodeStart).format("DD-MMM-YYYY")}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {moment(item.bidPeriodeEnd).format("DD-MMM-YYYY")}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <Badge color="primary" pill>
                      {/* {item.status ?? "-"} */}
                      {item.status === "Draft"
                        ? "Processing"
                        : item.status
                        ? item.status
                        : ""}
                    </Badge>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <Badge style={{ minWidth: 60 }} color="secondary" pill>
                      {item.statusContract ?? "-"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <PaginateCA sessionData={sessionData} userRoles={userRoles} />
    </React.Fragment>
  );
};

export default React.memo(TableConAp);
