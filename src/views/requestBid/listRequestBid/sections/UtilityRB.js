import React from "react";
import { Row, Col } from "reactstrap";
import { Input, Label, CustomInput } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DropdownFilterRB from "../components/DropdownFilterRB";

const MySwal = withReactContent(Swal);

const UtilityRB = () => {
  return (
    <React.Fragment>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-between mt-1"
          xl="6"
          md="6"
          sm="6"
        >
          <div className="">
            <Label className="mr-1" for="search-input-1">
              Show
            </Label>
            <CustomInput
              id="show"
              type="select"
              className="custominput-table2 border-0"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CustomInput>
          </div>
          <div className="row d-sm-none d-flex">
            <div className="">
              <DropdownFilterRB />
            </div>
          </div>
        </Col>
        <Col xl="6" md="6" sm="6">
          <Row className="d-flex justify-content-end align-items-center">
            <div className="d-none d-sm-block">
              <DropdownFilterRB />
            </div>
            <Col xl="6" md="6" sm="6">
              <Input
                className="search-table2"
                type="text"
                name="search"
                id="search-invoice"
                placeholder="Search"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // searchFunction(e.target.value, altPage);
                    // setTempName(e.target.value);
                  }
                }}
                onChange={(e) => {
                  console.log(e);
                  //   setTempName(e.target.value);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(UtilityRB);
