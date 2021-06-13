import {
  Drawer,
  CustomDrawer,
  Date,
  Number,
  TextArea,
} from "../elements/input-fields.js";

const TransactionForm = ({
  deal,
  briefSet,
  setFormState,
  setInstance,
  addTransaction,
  updateTransaction,
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
      <div className="record-data-form">
        <div
          className="x-button"
          onClick={() => {
            setFormState(false);
            setInstance({});
          }}
        />
        <form>
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
                onClick={() => addTransaction(deal)}
              />
            ) : (
              <input
                type="button"
                value="Update"
                onClick={() => updateTransaction(deal)}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export { TransactionForm };
