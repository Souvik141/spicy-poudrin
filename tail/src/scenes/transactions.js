import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFigure } from "../callouts/entityCallouts.js";
import { TransactionTemplate, DataForm } from "../elements/transaction.js";
import { Table } from "../elements/table.js";

const Transactions = ({ history }) => {
  console.log("Transactions");
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const entityFigure = useSelector((state) => state.entityFigure);
  const { user } = entityFigure;
  const [formState, setFormState] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/auth/signin");
    } else if (!user || !user.transactions) {
      dispatch(getFigure());
    }
  }, [dispatch, history, userInfo, user]);
  return (
    <div className="txns">
      <div className="txn-header">
        <div className="action-case">
          <input
            className="add-txn-button"
            type="button"
            value="Add"
            onClick={() => setFormState(true)}
          />
          <input
            className="import-txn-button"
            type="button"
            value="Import"
            onClick={() => setFormState(true)}
          />
        </div>
      </div>
      {formState && (
        <div className="add-txn-bg">
          <DataForm closeForm={() => setFormState(false)} />
        </div>
      )}
      <Table heads={TransactionTemplate} data={user ? user.transactions : []} />
    </div>
  );
};

export default Transactions;
