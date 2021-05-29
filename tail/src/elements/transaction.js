const TransactionTemplate = [
  {
    label: "Date",
    key: "date",
    type: "date",
    style: { minWidth: "80px", },
  },
  {
    label: "Amount",
    key: "amount",
    type: "number",
    style: { minWidth: "100px" },
  },
  {
    label: "Type",
    key: "type",
    type: "select",
    set: ["Debit", "Credit"],
    style: { minWidth: "60px" },
  },
  { label: "Brief", key: "brief", type: "text", style: { minWidth: "220px" } },
  {
    label: "Description",
    key: "description",
    type: "text-area",
    style: { minWidth: "auto" },
  },
];

const DataForm = ({ closeForm }) => {
  return (
    <div className="record-data-form">
      <div className="x-button" onClick={() => closeForm()} />
      <form>
        {TransactionTemplate.map((each) => {
          if (each.type === "select")
            return (
              <select>
                {each.set.map((eachOption) => {
                  return <option value={eachOption}>{eachOption}</option>;
                })}
              </select>
            );
          return <input type={each.type} />;
        })}
        <input type="button" value="Add" />
        <input type="button" value="Cancel" onClick={() => closeForm()} />
      </form>
    </div>
  );
};

export { TransactionTemplate, DataForm };
