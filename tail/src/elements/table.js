import { useState } from "react";
import downArrow from "../stocks/down-arrow.svg";

const DataBlock = ({ data, dataIndex }) => {
  switch (dataIndex.type) {
    case "date":
      return (
        <td key={dataIndex.key}>
          <span>{data[dataIndex.key].toString().substr(0, 10)}</span>
        </td>
      );
    default:
      return (
        <td key={dataIndex.key}>
          <span>{data[dataIndex.key]}</span>
        </td>
      );
  }
};

const DataRow = ({ row, heads, setRow, setClass }) => {
  return (
    <tr className="record-data">
      <td></td>
      {heads.map((eachHead) => {
        return <DataBlock data={row} dataIndex={eachHead} />;
      })}
      <td>
        <img
          src={downArrow}
          alt="action-arrow"
          className="inline-action"
          onClick={() => {
            console.log("clicked");
            setRow();
          }}
        />
        <div className={"options-case" + setClass}>
          <span className="option">Edit</span>
          <span className="option">Delete</span>
        </div>
      </td>
    </tr>
  );
};

const Table = ({ heads, data }) => {
  console.log("Table");
  const dataRows = data ? data : [];
  const [index, setIndex] = useState(-1);
  let refList = Array.from({ length: dataRows.length });
  refList.fill("disable hidden");
  if (index !== -1) refList[index] = "";
  return (
    <div className="table-container">
      <table className="record-table">
        <thead className="record-attr-case">
          <tr className="record-attr">
            <th></th>
            {heads.map(function (each) {
              return (
                <th key={each.key} style={each.style}>
                  <span>{each.label}</span>
                </th>
              );
            })}
            <th></th>
          </tr>
        </thead>
        <tbody className="record-data-case">
          {dataRows.map((each, ind) => {
            return (
              <DataRow
                heads={heads}
                row={each}
                setRow={() =>
                  index !== -1 && index === ind ? setIndex(-1) : setIndex(ind)
                }
                setClass={refList[ind]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
