import { useState } from "react";
import {
  Drawer,
  CustomDrawer,
  Date,
  Number,
  TextArea,
} from "./input-fields.js";
import { Dragger } from "../utils.js";

const ReserveForm = ({
  reserve,
  briefSet,
  setFormState,
  setInstance,
  addReserve,
  updateReserve,
  errorMessage
}) => {
  const setReserve = (key, value) => {
    const interim = reserve;
    interim[key] = value;
    setInstance(interim);
  };
  const reserveDeposit = reserve ? reserve["Deposit"] : undefined;
  const reservePerCent = reserve ? reserve["Interest /cent"] : undefined;
  const reserveTermType = reserve ? reserve["Term type"] : undefined;
  const reserveDate =
    reserve && reserve["Created Date"] ? reserve["Created Date"].toString().substr(0, 10) : undefined;
  const reserveAmount = reserve ? reserve["Amount"] : undefined;
  const reserveAimingDate =
    reserve && reserve["Aiming for"] ? reserve["Aiming for"].toString().substr(0, 10) : undefined;
  const reserveAmountIfAchieved = reserve ? reserve["Amount if achieved"] : undefined;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  return (
    <div className="add-txn-bg">
      <div className="slab-data-form"
        style={{ transform: `translate(calc(-50% + ${coords.x}px), calc(-50% + ${coords.y}px))` }}
      >
        <Dragger
          coords={coords}
          setCoords={(data) => {
            console.log(data);
            setCoords(data)
          }}
        />
        <div
          className="x-button"
          onClick={() => {
            setFormState(false);
            setInstance({});
          }}
        />
        <form>
          {errorMessage &&
          (<div style={{ lineHeight: "1.3" }}>
            <span style={{color: "red"}}>
              {errorMessage}
            </span>
          </div>)}
          <div className="form-field-case">
            <Drawer
              dataSet={[
                { value: "Fixed", label: "Fixed" },
                { value: "Recurring", label: "Recurring" },
                { value: "Other", label: "Other" },
              ]}
              label="Deposit"
              choice={reserveDeposit}
              onChange={(value) => setReserve("Deposit", value)}
              placeholder="choose..."
            />
          </div>
          <div className="form-field-case">
            <Number
              label="Interest /cent"
              value={reservePerCent}
              onChange={(value) => setReserve("Interest /cent", value)}
              placeholder="XX.XX"
            />
          </div>
          <div className="form-field-case">
            <Drawer
              dataSet={[
                { value: "Daily", label: "Daily" },
                { value: "Monthly", label: "Monthly" },
                { value: "Quaterly", label: "Quaterly" },
                { value: "Annually", label: "Annually" },
              ]}
              label="Term type"
              choice={reserveTermType}
              onChange={(value) => setReserve("Term type", value)}
              placeholder="choose..."
            />
          </div>
          <div className="form-field-case">
            <Date
              label="Created Date"
              value={reserveDate}
              onChange={(value) => setReserve("Created Date", value)}
            />
          </div>
          <div className="form-field-case">
            <Number
              label="Amount"
              value={reserveAmount}
              onChange={(value) => setReserve("Amount", value)}
              placeholder="XXXXXX.XX"
            />
          </div>
          <div className="form-field-case">
            <Date
              label="Aiming for"
              value={reserveAimingDate}
              onChange={(value) => setReserve("Aiming for", value)}
            />
          </div>
          <div className="form-field-case">
            <Number
              label="Amount if achieved"
              value={reserveAmountIfAchieved}
              onChange={(value) => setReserve("Amount if achieved", value)}
              placeholder="XXXXXX.XX"
            />
          </div>
          <div className="form-button-case">
            {!reserve._id ? (
              <input
                type="button"
                value="Add"
                onClick={() => addReserve(reserve)}
              />
            ) : (
              <input
                type="button"
                value="Update"
                onClick={() => updateReserve(reserve)}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export { ReserveForm };
