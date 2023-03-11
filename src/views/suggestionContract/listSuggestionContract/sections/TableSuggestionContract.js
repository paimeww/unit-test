import { FormGroup, CustomInput } from "reactstrap";
import { Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import PaginateSC from "../components/PaginationSC";
import styles from "styles/request_forecast/scrollbar.module.css";
import { ascByGenericName, descByGenericName } from "helpers/sortedArray";
import { useSelector } from "react-redux";

const TableSuggestionContract = (props) => {
  const stateFilter = useSelector((state) => state.listSC.filter);
  const { listSC, onChange, dataChecklist } = props;
  const page = stateFilter?.page ? stateFilter?.page * 1 - 1 : 0;
  const totalShow = (stateFilter?.totalShow ?? "5") * 1;

  return (
    <React.Fragment>
      <br />
      <div id={styles.Table}>
        <Table className="table border text-nowrap">
          <thead>
            <tr>
              <th className="text-left align-middle">
                <span className="">PROCESS TO CONTRACT</span>
              </th>
              <th className="text-left px-2 align-middle py-2">NO.</th>
              <th className="text-left align-middle py-2">GENERIC NAME</th>
              <th className="text-left align-middle py-2">ITEM CODE</th>
              <th className="text-left align-middle py-2">ITEM DESCRIPTION</th>
              <th className="text-left align-middle py-2">MANUFACTURE</th>
              <th className="text-left align-middle py-2">SBU</th>
              <th className="text-left align-middle py-2">SITE</th>
              <th className="text-left align-middle py-2">ORG CODE</th>
              <th className="text-left align-middle py-2">UOM</th>
              <th className="text-left align-middle py-2">
                MFG (SINGLE/NON SINGLE)
              </th>
              <th className="text-left align-middle py-2">KELOMPOK MATERIAL</th>
              <th className="text-left align-middle">
                <span className="">RUTIN / NON RUTIN</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ascByGenericName(listSC).map((item, index) => {
              var dataExist = dataChecklist.filter((el) => el.id == item.id);
              return (
                <tr key={item?.id}>
                  <td style={{ textAlign: "center" }}>
                    <FormGroup
                      style={{ zIndex: 0, position: "relative" }}
                      className="mb-0"
                    >
                      <CustomInput
                        style={{ zIndex: 0, position: "relative" }}
                        inline
                        type="checkbox"
                        id={"suggestionContract" + item.id}
                        label=""
                        checked={dataExist.length > 0}
                        value={item.id}
                        onChange={(value) => {
                          onChange(value, item);
                        }}
                      />
                    </FormGroup>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {totalShow * page + index + 1 + "."}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.genericName}</td>
                  <td style={{ textAlign: "left" }}>{item.itemCode}</td>
                  <td className={styles.text} style={{ textAlign: "left" }}>
                    {item.itemDescription}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.manufacture}</td>
                  <td style={{ textAlign: "left" }}>{item.sbu}</td>
                  <td style={{ textAlign: "left" }}>{item.site}</td>
                  <td style={{ textAlign: "left" }}>{item.orgCode}</td>
                  <td style={{ textAlign: "left" }}>{item.uom}</td>
                  <td style={{ textAlign: "left" }}>{item.mfg}</td>
                  <td style={{ textAlign: "right" }}>
                    {item.kelompokMaterial}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {parseInt(item.isRoutine) ? "Ya" : "Tidak"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <PaginateSC />
    </React.Fragment>
  );
};

export default React.memo(TableSuggestionContract);
