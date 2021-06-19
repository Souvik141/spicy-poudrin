import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFigure } from "../callouts/entity-callouts.js";
import {
  getReserves,
  addReserve,
  updateReserve,
  deleteReserve,
} from "../callouts/reserve-callouts.js";
import { ReserveForm } from "../elements/reserve.js";
import Nugget from "../elements/nugget.js";

const Reserves = ({ history }) => {
  console.log("Reserves");
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const entityFigure = useSelector((state) => state.entityFigure);
  const { user } = entityFigure;
  const reserveState = useSelector((state) => state.reserveState);
  const { reserves, error } = reserveState;
  console.log(reserves);

  const [formState, setFormState] = useState(false);
  const [reserveInstance, setReserveInstance] = useState({});
  const [briefSet, setBriefSet] = useState([]);
  const [briefActionSet, setBriefActionSet] = useState([]);
  // const [reserveSet, setReserves] = useState(reserves);
  const [view, setView] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  useEffect(() => {
    if (!userInfo) {
      history.push("/auth/signin");
    } else if (!user) {
      dispatch(getFigure());
    }
    if (!reserves) {
      dispatch(getReserves());
    }
    if(error) {
      setErrorMessage(error)
    }
    else {
      setErrorMessage(undefined)
      setFormState(false)
    }
  }, [dispatch, history, user, userInfo, reserves, error]);

  const addReserveCallout = (deal) => {
    dispatch(addReserve(deal));
  };
  const updateReserveCallout = (deal) => {
    dispatch(updateReserve(deal));
  };

  return (
    <div className="Reserves scene-case">
      <div className="txn-header">
        <div className="txn-text-case">
          <h3>Reserves</h3>
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
      {reserves && (<ReservesBucket
        data={reserves}
      />)}
      {formState && (
        <ReserveForm
          reserve={reserveInstance}
          briefSet={briefSet}
          setFormState={(value) => setFormState(value)}
          setInstance={(value) => setReserveInstance(value)}
          addReserve={(value) => addReserveCallout(value)}
          updateReserve={(value) => updateReserveCallout(value)}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

const ReservesBucket = ({ data }) => {
  console.log(data);
  return (
    <div class="bucket-container flex">
      {data && data.map(each => {
          return (<Nugget
            nugget={each}
          />)
      })}
    </div>
  );
};

export default Reserves;
