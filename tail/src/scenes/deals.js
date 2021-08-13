import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFigure } from "../callouts/entity-callouts.js";
import {
  getDeals,
  addDeal,
  updateDeal,
  deleteDeal,
} from "../callouts/deal-callouts.js";
import { DealForm } from "../elements/deal.js";
import { isEmpty, SlabHead, Slab } from "../utils";
import { ControlDrawer, VirginSpanker } from "../elements/input-fields.js";

const Deals = ({ history }) => {
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const entityFigure = useSelector((state) => state.entityFigure);
  const { user } = entityFigure;
  const dealState = useSelector((state) => state.dealState);
  const { deals, totalDeal, error } = dealState;

  const [formState, setFormState] = useState(false);
  const [dealInstance, setDealInstance] = useState({});
  const [briefSet, setBriefSet] = useState([]);
  const [briefActionSet, setBriefActionSet] = useState([]);
  const [dealView, setDealView] = useState(deals);
  const [view, setView] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);

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
    console.log(error);
    if(error) {
      setErrorMessage(error)
    }
    else {
      setErrorMessage(undefined)
      setFormState(false)
    }
  }, [dispatch, history, user, userInfo, deals, view, error]);

  const addDealCallout = (deal) => {
    dispatch(addDeal(deal));
  };
  const updateDealCallout = (deal) => {
    dispatch(updateDeal(deal));
  };
  const deleteDealCallout = (deal) => {
    dispatch(deleteDeal(deal));
  };
  return (
    <div className="txns scene-case">
      <div className="txn-header">
        <div className="txn-text-case">
          <h3>{view ? view : "All"} Deals</h3>
          <h5>
            Count: {!dealView ? 0 : dealView.length} Balance: {totalDeal}
          </h5>
        </div>
        <div className="action-case">
          <VirginSpanker
            label="Add"
            onClickAction={() => setFormState(true)}
          />
          <VirginSpanker
            label="Import"
            onClickAction={() => console.log}
          />
          {dealView && <a
            className="export-txn-button"
            href = {window.URL.createObjectURL(new Blob([JSON.stringify(deals)]))}
            download = 'deals.json'
          >Export</a>}
        </div>
      </div>
      {/* <DealBucket
        data={dealView}
        briefActionSet={briefActionSet}
        setFormState={(value) => setFormState(value)}
        setInstance={(value) => setDealInstance(value)}
        deleteInstance={(value) => {
          if(window.confirm("Do you really want to delete this deal?"))
            deleteDealCallout(value)
        }}
      /> */}
      <SlabHead briefActionSet={briefActionSet} />
      <div class="slab-bucket-body">
        {isEmpty(dealView) ?
          (<div class="no-deals-div">
            <span>Nothing to see here</span>
          </div>)
          : dealView.map((each, index) => {
            var values = []
            values.push({class: "", value: ""})
            values.push({
              class: "date-div",
              value: each["date"].toString().substr(8, 2)
              + "-" + each["date"].toString().substr(5, 2)
              + "-" + each["date"].toString().substr(0, 4)
            })
            values.push({class: "amount-div", value: each["amount"]})
            values.push({class: "type-div", value: each["type"].label})
            values.push({class: "brief-div", value: each["brief"]})
            values.push({class: "description-div", value: each["description"]})
            values.push({class: "control-drawer-div", value: [
              {
                label: "Edit",
                action: () => {
                  setFormState(true);
                  setDealInstance(each);
                },
              },
              {
                label: "Delete",
                action: () => {
                  if(window.confirm("Do you really want to delete this deal?"))
                    deleteDealCallout(each)
                },
              },
            ]})
            values.push({class: "", value: ""})
            return (<Slab values={values} />);
          })}
      </div>
      {formState && (
        <DealForm
          deal={dealInstance}
          briefSet={briefSet}
          setFormState={(value) => setFormState(value)}
          setInstance={(value) => setDealInstance(value)}
          addDeal={(value) => addDealCallout(value)}
          updateDeal={(value) => updateDealCallout(value)}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

const DealBucket = ({
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
    <div class="bucket-container grid">
      <div class="slab-bucket">
        <div class="slab-bucket-head">
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
        <div class="slab-bucket-body">
          {isEmpty(data) ?
            (<div class="no-deals-div">
              <span>Nothing to see here</span>
            </div>)
            : data.map((each, index) => {
              var values = []
              values.push({class: "", value: ""})
              values.push({
                class: "date-div",
                value: each["date"].toString().substr(8, 2)
                + "-" + each["date"].toString().substr(5, 2)
                + "-" + each["date"].toString().substr(0, 4)
              })
              values.push({class: "amount-div", value: each["amount"]})
              values.push({class: "type-div", value: each["type"].label})
              values.push({class: "brief-div", value: each["brief"]})
              values.push({class: "description-div", value: each["description"]})
              values.push({class: "control-drawer-div", value: [
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
              ]})
              values.push({class: "", value: ""})
              return (<Slab values={values} />);
            })}
        </div>
      </div>
    </div>
  );
};

export default Deals;
