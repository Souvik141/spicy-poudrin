import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFigure } from "../callouts/entityCallouts.js";
import { TransactionTemplate, AddTranactionButton } from "../elements/transaction.js";
import { Table } from "../elements/table.js";
import { Drawer } from "../elements/ip-fields.js";

const Transactions = ({ history }) => {
  console.log("Transactions");
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const entityFigure = useSelector((state) => state.entityFigure);
  const { user } = entityFigure;
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
          <AddTranactionButton />
          <input
            className="import-txn-button"
            type="button"
            value="Import"
          />
        </div>
      </div>
      <Table heads={TransactionTemplate} data={user ? user.transactions : []} />
    </div>
  );
};

export default Transactions;
