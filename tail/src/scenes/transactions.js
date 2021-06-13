import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFigure } from "../callouts/entity-callouts.js";
import {
  getDeals,
  addDeal,
  updateDeal,
  deleteDeal,
} from "../callouts/transaction-callouts.js";
import { TransactionForm } from "../elements/transaction.js";
import { isEmpty } from "../utils";
import { ControlDrawer, TextAreaView } from "../elements/input-fields.js";

const Transactions = ({ history }) => {
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const entityFigure = useSelector((state) => state.entityFigure);
  const { user } = entityFigure;
  const dealState = useSelector((state) => state.dealState);
  const { deals, totalDeal } = dealState;

  const [formState, setFormState] = useState(false);
  const [dealInstance, setDealInstance] = useState({});
  const [briefSet, setBriefSet] = useState([]);
  const [briefActionSet, setBriefActionSet] = useState([]);
  const [dealView, setDealView] = useState(deals);
  const [view, setView] = useState(undefined);

  useEffect(() => {
    if (!userInfo) {
      history.push("/auth/signin");
    } else if (!user) {
      dispatch(getFigure());
    }
    if (!deals) {
      dispatch(getDeals());
    }
    if (deals) {
      var briefSetInterim = [];
      var briefActionSetInterim = [];
      deals.forEach((each) => {
        if (briefSetInterim.indexOf(each.brief) === -1) {
          briefSetInterim.push(each.brief);
          briefActionSetInterim.push({
            label: each.brief,
            action: () => setView(each.brief),
          });
        }
      });
      briefActionSetInterim.push({
        label: "All",
        action: () => setView(undefined),
      });
      setBriefSet(briefSetInterim);
      setBriefActionSet(briefActionSetInterim);
    }
    if (deals && view) {
      var viewInterim = [];
      deals.forEach((each) => {
        if (each.brief === view) viewInterim.push(each);
      });
      setDealView(viewInterim);
    } else {
      setDealView(deals);
    }
  }, [dispatch, history, user, userInfo, deals, view]);

  const addTransaction = (deal) => {
    dispatch(addDeal(deal));
  };
  const updateTransaction = (deal) => {
    dispatch(updateDeal(deal));
  };
  const deleteTransaction = (deal) => {
    dispatch(deleteDeal(deal));
  };

  return (
    <div className="txns">
      <div className="txn-header">
        <div className="txn-text-case">
          <h3>{view ? view : "All"} Transactions</h3>
          <h5>
            Count: {!dealView ? 0 : dealView.length} Balance: {totalDeal}
          </h5>
        </div>
        <div className="action-case">
          <input
            className="add-txn-button"
            type="button"
            value="Add"
            onClick={() => setFormState(true)}
          />
          <input className="import-txn-button" type="button" value="Import" />
        </div>
      </div>
      <TransactionTable
        data={dealView}
        briefActionSet={briefActionSet}
        setFormState={(value) => setFormState(value)}
        setInstance={(value) => setDealInstance(value)}
        deleteInstance={(value) => deleteTransaction(value)}
      />
      {formState && (
        <TransactionForm
          deal={dealInstance}
          briefSet={briefSet}
          setFormState={(value) => setFormState(value)}
          setInstance={(value) => setDealInstance(value)}
          addTransaction={(value) => addTransaction(value)}
          updateTransaction={(value) => updateTransaction(value)}
        />
      )}
    </div>
  );
};

const TransactionTable = ({
  data,
  briefActionSet,
  setFormState,
  setInstance,
  deleteInstance,
}) => {
  const [thisData, setData] = useState(data);
  useEffect(() => {
    if (isEmpty(thisData)) {
      setData(data);
    }
  }, [data, thisData]);
  return (
    <div className="table-container">
      <div className="record-table">
        <div className="record-table-head">
          <div />
          <div class="date-div content">
            <h5>Date</h5>
          </div>
          <div class="amount-div content">
            <h5>Amount</h5>
          </div>
          <div class="type-div content">
            <h5>Type</h5>
          </div>
          <div class="brief-div content">
            <h5>Brief</h5>
            <ControlDrawer actionSet={briefActionSet} />
          </div>
          <div class="description-div content">
            <h5>Description</h5>
          </div>
          <div class="control-drawer-div content"></div>
          <div class="negative-space" />
        </div>
        <div className="record-table-body">
          {!isEmpty(data) &&
            data.map((each, index) => {
              return (
                <>
                  <div class="content" />
                  <div class="date-div content">
                    <span>
                      {each["date"].toString().substr(8, 2) +
                        "-" +
                        each["date"].toString().substr(5, 2) +
                        "-" +
                        each["date"].toString().substr(0, 4)}
                    </span>
                  </div>
                  <div class="amount-div content">
                    <span>{each["amount"]}</span>
                  </div>
                  <div class="type-div content">
                    <span>{each["type"].label}</span>
                  </div>
                  <div class="brief-div content">
                    <span>{each["brief"]}</span>
                  </div>
                  <div class="description-div content">
                    <TextAreaView value={each["description"]} />
                  </div>
                  <div class="control-drawer-div content">
                    <ControlDrawer
                      actionSet={[
                        {
                          label: "Edit",
                          action: () => {
                            setFormState(true);
                            setInstance(each);
                          },
                        },
                        {
                          label: "Delete",
                          action: () => deleteInstance(each),
                        },
                      ]}
                    />
                  </div>
                  <div class="negative-space" />
                </>
              );
            })}
          <div class="record-table-body-scroll">
            <div class="bar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
