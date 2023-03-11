import React, { useRef, useState } from "react";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Card,
  Button,
  Spinner,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getFileUploadHeaders, thousandFormat } from "helpers/utils";
import moment from "moment";
import { useRouter } from "next/router";
import Uppy from "@uppy/core";
import { XHRUpload } from "uppy";
import { API_FILES_STAGING_URL, API_FILES_URL } from "constant";
import SuccessNotification from "components/Alert/SuccessNotification";
import ConfirmAlert from "components/Alert/ConfirmAlert";
import {
  downloadAs,
  getDetailContractApproval,
  saveContractApproval,
  submitContractApproval,
} from "helpers/contractApproval";
import ErrorNotification from "components/Alert/ErrorNotification";
import { getPermissionComponent } from "helpers/getPermission";

const MySwal = withReactContent(Swal);

const FromGroupInquiryCA = ({ data, userRoles, sessionData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [newData, setNewData] = useState(data);
  const [dataPrintOut, setDataPrintOut] = useState(null);
  const [top, setTop] = useState(newData.top);

  const updateData = async () => {
    var response = await getDetailContractApproval(sessionData, data.id);
    setNewData(response);
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

  const showSuccessNotification = (msg, title) => {
    return MySwal.fire({
      position: "center",
      html: (
        <SuccessNotification
          onClose={() => MySwal.close()}
          onConfirm={() => MySwal.close()}
          title={title ?? "Success"}
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

  const confirmAlert = () => {
    MySwal.close();
    return MySwal.fire({
      position: "center",
      html: (
        <ConfirmAlert
          onClose={() => {
            MySwal.close();
          }}
          onConfirm={() => {
            MySwal.close();
            setLoading(true);
            submitContractApproval(sessionData, newData, dataPrintOut)
              .then((response) => {
                if (response) {
                  updateData();
                  showSuccessNotification("Success", "Submit");
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              })
              .catch((error) => {
                errorNotification(error.message.toString());
                setLoading(false);
              });
          }}
          title={"Submit"}
          description={"Are you sure want to submit this contract?"}
          newButton={true}
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
    <div className="pl-2 mt-2">
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
              setDataPrintOut(response.body);
              saveContractApproval(sessionData, newData, response.body)
                .then((response) => {
                  if (response) {
                    updateData();
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
            console.info("Successful uploads:", result.successful);
            if (result.failed.length > 0) {
              console.error("Errors:");
              result.failed.forEach((file) => {
                console.error(file.error);
              });
            }
          });
        }}
      />
      <Card className="p-4 pt-0 col-12">
        <Form>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">No Request</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.requestNumber}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">No Contract</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.contractNumber}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Site</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.site}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Item Code</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.itemCode}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Item Name</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.genericName}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Manufacture</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.manufacturer}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Vendor</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.vendorName}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">QTY </span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={thousandFormat(newData.bidQty)}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">UOM</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.uom}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Price per UOM</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={thousandFormat(newData.bidPricePerUOM)}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Currency</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.bidCurrency}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Periode Start</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      onChange={() => {}}
                      value={moment(newData.bidPeriodeStart).format(
                        "DD-MMM-YYYY"
                      )}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Periode End</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      onChange={() => {}}
                      value={moment(newData.bidPeriodeEnd).format(
                        "DD-MMM-YYYY"
                      )}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">Periode Allowance</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      onChange={() => {}}
                      value={moment(newData.bidDeliveryAllowance).format(
                        "DD-MMM-YYYY"
                      )}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={2}>
              <span className="">TOP</span>
            </Col>
            <div className="col-12 col-md-10">
              <div className="row">
                <Col md={12} className="mt-1">
                  <FormGroup>
                    <Input
                      id="noRequest"
                      name="noRequest"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={top}
                      onChange={(value) => {
                        setTop(value.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          </Row>
          <Row className="d-flex justify-content-start align-items-center">
            <Col md={8}>
              <Row className="d-flex justify-content-start align-items-center">
                <Col md={3}>
                  <span className="">Attachment</span>
                </Col>
                <Col md={5} className="mt-1">
                  <FormGroup>
                    <Input
                      id="attachment"
                      name="attachment"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.contractAttachmentName}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="mt-0">
                  {newData.contractAttachmentId.length != 0 && (
                    <Button.Ripple
                      disabled={newData.contractAttachmentId.length == 0}
                      onClick={(e) => {
                        e.preventDefault();
                        var url =
                          API_FILES_URL +
                          `/api/Files/${newData.contractAttachmentId}/download`;
                        console.log(url);
                        downloadAs(
                          url,
                          newData.contractNumber
                            ? newData.contractNumber
                            : newData.requestNumber
                        );
                      }}
                      color="success"
                      className="col-12"
                    >
                      Download Attachment
                    </Button.Ripple>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="mt-1 d-flex justify-content-center align-items-center mt-md-0">
                <Col md={4}>
                  <span className="">Attachment Status</span>
                </Col>
                <Col md={8} className="mt-1">
                  <FormGroup>
                    <Input
                      id="statusAttachment"
                      name="statusAttachment"
                      placeholder="Placeholder"
                      type="text"
                      disabled
                      value={newData.statusAttachment}
                      onChange={() => {}}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          {newData.statusAttachment != "Submitted" &&
            getPermissionComponent(["Supplier"]) && (
              <div className="mt-4 row">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-md-8 col-12">
                  <div className="row justify-content-between">
                    {!loading ||
                      (!loadingUpload && (
                        <div className="mb-2 col-md-3 col-12">
                          <Button.Ripple
                            onClick={() =>
                              router.push(
                                "/contract_approval/pdf_preview/" + newData.id
                              )
                            }
                            color="success"
                            className="col-12"
                          >
                            DOWNLOAD
                          </Button.Ripple>
                        </div>
                      ))}
                    {loadingUpload && <Spinner color="primary" />}
                    {!loading ||
                      (!loadingUpload && (
                        <div className="mb-2 col-md-3 col-12">
                          <Button.Ripple color="success" className="col-12">
                            <div
                              onClick={() => {
                                handleUpload();
                              }}
                            >
                              UPLOAD
                            </div>
                          </Button.Ripple>
                        </div>
                      ))}
                    {loading && <Spinner color="primary" />}
                    {!loading ||
                      (!loadingUpload && (
                        <div className="mb-2 col-md-3 col-12">
                          <Button.Ripple
                            onClick={() => confirmAlert()}
                            color="success"
                            className="col-12"
                          >
                            SUBMIT
                          </Button.Ripple>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
        </Form>
      </Card>
    </div>
  );
};

export default FromGroupInquiryCA;
