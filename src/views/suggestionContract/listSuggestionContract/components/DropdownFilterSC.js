import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
} from "reactstrap";
import { CustomInput } from "reactstrap";
import { Filter } from "react-feather";

const DropdownFilterSC = ({ onchange }) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    onchange(active);
    return () => {};
  }, [active]);

  return (
    <UncontrolledDropdown>
      <DropdownToggle
        className="icon-btn hide-arrow"
        color="transparent"
        size="sm"
        caret
      >
        <Filter size={20} className="text-success mr-0" />
      </DropdownToggle>
      <DropdownMenu className="border-0 border-radius-6 mr-2">
        <DropdownItem
          style={{ width: 350 }}
          className="action-vuexy-item"
          onClick={() => {
            setActive("az");
          }}
        >
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                label=""
                id="az"
                defaultChecked={active == "az"}
              />
            </FormGroup>
            <span>Sort A to Z</span>
          </div>
        </DropdownItem>
        <DropdownItem
          style={{ width: 350 }}
          className="action-vuexy-item"
          onClick={() => {
            setActive("za");
          }}
        >
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                label=""
                id="za"
                defaultChecked={active == "za"}
              />
            </FormGroup>
            <span className="">Sort Z to A</span>
          </div>
        </DropdownItem>
        <DropdownItem
          style={{ width: 350 }}
          className="action-vuexy-item"
          onClick={() => {
            setActive("sl");
          }}
        >
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                label=""
                id="sl"
                defaultChecked={active == "sl"}
              />
            </FormGroup>
            <span className="">Sort from smallest to largest No. Request</span>
          </div>
        </DropdownItem>
        <DropdownItem
          style={{ width: 350 }}
          className="action-vuexy-item"
          onClick={() => {
            setActive("ls");
          }}
        >
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                label=""
                id="ls"
                defaultChecked={active == "ls"}
              />
            </FormGroup>
            <span className="">Sort from largest to smallest No. Request</span>
          </div>
        </DropdownItem>
        <DropdownItem
          style={{ width: 350 }}
          className="action-vuexy-item"
          onClick={() => {
            setActive("no");
          }}
        >
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                label=""
                id="no"
                defaultChecked={active == "no"}
              />
            </FormGroup>
            <span className="">Sort from newest to oldest</span>
          </div>
        </DropdownItem>
        <DropdownItem
          style={{ width: 350 }}
          className="action-vuexy-item"
          onClick={() => {
            setActive("on");
          }}
        >
          <div style={{ width: 100 }} className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                label=""
                id="on"
                defaultChecked={active == "on"}
              />
            </FormGroup>
            <span className="">Sort from oldest to newest</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default React.memo(DropdownFilterSC);
