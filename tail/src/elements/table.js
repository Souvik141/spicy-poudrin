import { useState } from "react";
import Select from "react-select";
import { Drawer, ControlDrawer } from "../elements/ip-fields.js";
import downArrow from "../stocks/down-arrow.svg";

const DataBlock = ({ data, dataIndex, isEditing }) => {
  switch (dataIndex.type) {
    case "date":
      return (
        <td key={dataIndex.key}>
          {isEditing ?
          (<input type="date" value={data[dataIndex.key].toString().substr(0, 10)} />)
          : (<span>{data[dataIndex.key].toString().substr(0, 10)}</span>)}
        </td>
      );
    case "number":
      return (
        <td key={dataIndex.key}>
        {isEditing ?
          (<input type="number" value={data[dataIndex.key]} />)
          : (<span>{data[dataIndex.key]}</span>)}
        </td>
      );
    case "select":
      return (
        <td key={dataIndex.key}>
        {isEditing ?
          (
          // <Drawer
          //   searchable={false}
          //   value={data[dataIndex.key]}
          //   options={dataIndex.set}
          // />
          <Drawer
            dataSet={[
              { value: 'debit', label: 'Debit' },
              { value: 'credit', label: 'Credit' }
            ]}
          />)
          : (<span>{data[dataIndex.key]}</span>)}
        </td>
      )
    case "textarea":
      return (
        <td key={dataIndex.key}>
        {isEditing ?
          (<textarea rows='1' cols='50' value={data[dataIndex.key]} />)
          : (<span>{data[dataIndex.key]}</span>)}
        </td>
      );
    default:
      return (
        <td key={dataIndex.key}>
        {isEditing ?
          (<input type="text" value={data[dataIndex.key]} />)
          : (<span>{data[dataIndex.key]}</span>)}
        </td>
      );
  }
};

const DataRow = ({ row, heads, setRow, setClass }) => {
  const [isEditing, edit] = useState(false)
  return (
    <tr className="record-data">
      <td></td>
      {heads.map((eachHead) => {
        return <DataBlock data={row} dataIndex={eachHead} isEditing={isEditing} />;
      })}
      <td>
        {/* <img
          src={downArrow}
          alt="action-arrow"
          className="inline-action"
          onClick={() => {
            setRow();
          }}
        />
        <div className={"options-case" + setClass}>
          <span className="option" onClick={() => edit(true)}>Edit</span>
          <span className="option">Delete</span>
        </div> */}
        <ControlDrawer
          actionSet={[
            {
              label: "Edit",
              action: () => edit(true)
            },
            {
              label: "Delete",
              action: () => edit(true)
            }
          ]}
        />
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
