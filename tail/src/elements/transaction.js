import { useState } from "react"
import { Drawer, ControlDrawer, Text, Date, Number, TextArea } from "../elements/ip-fields.js";

const TransactionTemplate = [
  {
    label: "Date",
    key: "date",
    type: "date",
    style: {
      minWidth: "80px",
      width: "auto"
    },
  },
  {
    label: "Amount",
    key: "amount",
    type: "number",
    style: {
      minWidth: "100px",
      width: "auto"
    },
  },
  {
    label: "Type",
    key: "type",
    type: "select",
    set: [
      { value: 'debit', label: 'Debit' },
      { value: 'credit', label: 'Credit' }
    ],
    style: {
      minWidth: "60px",
      width: "auto"
    },
  },
  {
    label: "Brief",
    key: "brief",
    type: "text",
    style: {
      minWidth: "100px",
      width: "auto",
    },
  },
  {
    label: "Description",
    key: "description",
    type: "textarea",
    style: {
      width: "auto"
    },
  },
];

const AddTranactionButton = () => {
  const [formState, setFormState] = useState(false)
  const [ntxnDate, setTxnDate] = useState(undefined)
  const [ntxnAmount, setTxnAmount] = useState(undefined)
  const [ntxnType, setTxnType] = useState({ value: 'debit', label: 'Debit' })
  const [ntxnBrief, setTxnBrief] = useState(undefined)
  const [ntxnDesc, setTxnDesc] = useState(undefined)
  return (
    <>
      <input
        className="add-txn-button"
        type="button"
        value="Add"
        onClick={() => setFormState(true)}
      />
      {formState && (
        <div className="add-txn-bg">
          <div className="record-data-form">
            <div className="x-button" onClick={() => setFormState(false)} />
            <form>
              <div className='form-field-case'>
                <Date
                  label="Date"
                  value={ntxnDate}
                  onChange={(value) => setTxnDate(value)}
                />
              </div>
              <div className='form-field-case'>
                <Number
                  label="Amount"
                  value={ntxnAmount}
                  onChange={(value) => setTxnAmount(value)}
                  placeholder="XXXX.XX"
                />
              </div>
              <div className='form-field-case'>
                <Drawer
                  dataSet={[
                    { value: 'debit', label: 'Debit' },
                    { value: 'credit', label: 'Credit' }
                  ]}
                  label="Type"
                  value={ntxnType}
                  onChange={(value) => setTxnType(value)}
                  placeholder="choose..."
                />
              </div>
              <div className='form-field-case'>
                <Text
                  label="Brief"
                  value={ntxnBrief}
                  onChange={(value) => setTxnBrief(value)}
                  placeholder="short tag"
                />
              </div>
              <div className='form-field-case'>
                <TextArea
                  label="Description"
                  value={ntxnDesc}
                  onChange={(value) => setTxnDesc(value)}
                  placeholder="go WILD"
                />
              </div>
              <div className='form-button-case'>
                <input type="button" value="Add" />
                <input type="button" value="Cancel" onClick={() => {
                  setFormState(false)
                  setTxnDate(undefined)
                  setTxnAmount(undefined)
                  setTxnType(undefined)
                  setTxnBrief(undefined)
                  setTxnDesc(undefined)
                }} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export {
  TransactionTemplate,
  AddTranactionButton
};
