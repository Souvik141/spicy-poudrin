import { useState } from "react"
import Select from "react-select"
import { ControlDrawer } from "../elements/ip-fields.js";

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
                <label>Date</label>
                <input type="date" value={ntxnDate} onChange={(event) => setTxnDate(event.target.value)} />
              </div>
              <div className='form-field-case'>
                <label>Amount</label>
                <input type="number" value={ntxnAmount} onChange={(event) => setTxnAmount(event.target.value)} />
              </div>
              <div className='form-field-case'>
                <label>Type</label>
                <Select
                  className='dropdown-field'
                  searchable={false}
                  value={ntxnType}
                  onChange={(option) => setTxnType(option)}
                  options={[
                    { value: 'debit', label: 'Debit' },
                    { value: 'credit', label: 'Credit' }
                  ]}
                />
              </div>
              <div className='form-field-case'>
                <label>Brief</label>
                <input type="text" value={ntxnBrief} onChange={(event) => setTxnBrief(event.target.value)} />
              </div>
              <div className='form-field-case'>
                <label>Description</label>
                <textarea rows='3' cols='50' value={ntxnDesc} onChange={(event) => setTxnDesc(event.target.value)} />
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
