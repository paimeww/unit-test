import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
} from "reactstrap";
import { CustomInput } from "reactstrap";
import { List } from "react-feather";

const DropdownSelectColumnConAp = () => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        className="icon-btn hide-arrow"
        color="transparent"
        size="sm"
        caret
      >
        <List size={20} className="text-success mr-0" />
      </DropdownToggle>
      <DropdownMenu positionFixed={true} className="border-0 border-radius-6 mr-2">
        <DropdownItem style={{ width: 170 }} className="action-vuexy-item">
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                id="exampleCustomCheckbox2"
                label=""
              />
            </FormGroup>
            <span className="">No. Request</span>
          </div>
        </DropdownItem>
        <DropdownItem style={{ width: 170 }} className="action-vuexy-item">
          <div className="d-flex">
            <FormGroup className="mb-0 ml-0">
              <CustomInput
                inline
                type="checkbox"
                id="exampleCustomCheckbox2"
                label=""
              />
            </FormGroup>
            <span className="">Generic Name</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default React.memo(DropdownSelectColumnConAp);
