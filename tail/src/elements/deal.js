import { set } from "mongoose";
import { useState } from "react";
import {
  Drawer,
  CustomDrawer,
  Date,
  Number,
  TextArea,
} from "./input-fields.js";

const DealForm = ({
  deal,
  briefSet,
  setFormState,
  setInstance,
  addDeal,
  updateDeal,
  errorMessage
}) => {
  const setDeal = (key, value) => {
    const interim = deal;
    interim[key] = value;
    setInstance(interim);
  };
  const dealDate =
    deal && deal.date ? deal.date.toString().substr(0, 10) : undefined;
  const dealAmount = deal ? deal.amount : undefined;
  const dealType = deal ? deal.type : undefined;
  const dealBrief = deal ? deal.brief : undefined;
  const dealDesc = deal ? deal.description : undefined;
  return (
    <div className="add-txn-bg">
      <div className="slab-data-form">
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
            <Date
              label="Date"
              value={dealDate}
              onChange={(value) => setDeal("date", value)}
            />
          </div>
          <div className="form-field-case">
            <Number
              label="Amount"
              value={dealAmount}
              onChange={(value) => setDeal("amount", value)}
              placeholder="XXXX.XX"
            />
          </div>
          <div className="form-field-case">
            <Drawer
              dataSet={[
                { value: -1, label: "Debit" },
                { value: 1, label: "Credit" },
              ]}
              label="Type"
              choice={dealType}
              onChange={(value) => setDeal("type", value)}
              placeholder="choose..."
            />
          </div>
          <div className="form-field-case">
            <CustomDrawer
              label="Brief"
              choice={dealBrief}
              onChange={(value) => setDeal("brief", value)}
              placeholder="short tag"
              dataSet={briefSet}
            />
          </div>
          <div className="form-field-case">
            <TextArea
              dimens={[3, 50]}
              label="Description"
              value={dealDesc}
              onChange={(value) => setDeal("description", value)}
              placeholder="go WILD"
            />
          </div>
          <div className="form-button-case">
            {!deal._id ? (
              <input
                type="button"
                value="Add"
                onClick={() => addDeal(deal)}
              />
            ) : (
              <input
                type="button"
                value="Update"
                onClick={() => updateDeal(deal)}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export { DealForm };
