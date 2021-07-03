/**
 * @description     : Consists utilities for the tail (frontend)
 * @author          : Sav
 * @group           : utilities
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         with { generate token, verify token }
 */
import { useState } from "react";
import { View, ControlDrawer } from "./elements/input-fields.js";

const parseSearch = (searchString) => {
  if (searchString.charAt(0) !== "?") return {};
  searchString = searchString.substr(1, searchString.length);
  const queries = searchString.split("&");
  let query = {};
  queries.forEach(function (item) {
    const index = item.indexOf("=");
    if (index > 0)
      query[item.substr(0, index)] = item.substr(index + 1, item.length);
  });
  return query;
};

const isEmpty = (obj) => {
  if (obj === undefined) return true;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const isObject = (variable) => {
  if (typeof variable === 'object' && variable !== null)  return true;
  return false;
};

const Nugget = ({ nugget }) => {
  const values = []
  for(var key in nugget) {
    values.push({ label: key, value: nugget[key]})
  }
  return (
    <div class="nugget">
      {values.map((each) => {
        return (
          <>
            <div>
              <h5>{each.label}: </h5>
            </div>
            <div>
              {isObject(each.value)
              ? (<span>{each.value.label}</span>)
              : (<span>{each.value}</span>)}
            </div>
          </>
        )
      })}
    </div>
  );
}

const Slab = ({ values }) => {
  return (
    <div class="slab">
      {values.map((each) => {
        if(each.class === "control-drawer-div")
          return (
            <div class={each.class + " content"}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}>
              <ControlDrawer actionSet={each.value} />
            </div>
          )
        else
          return (
            <div class={each.class + " content"}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}>
              <View value={each.value} />
            </div>
          )
      })}
    </div>
  );
}

const Dragger = ({coords, setCoords}) => {
  const [coordLead, setCoordLead] = useState({ x: 0, y: 0 });
  const [tracking, setTracking] = useState(false);
  return (<div
    className={tracking ? "dragger grabbing" : "dragger grab"}
    onMouseDown={(event) => {
      setTracking(true)
      setCoordLead({
        x: event.clientX - coords.x,
        y: event.clientY - coords.y
      })
    }}
    onTouchStart={(event) => {
      setTracking(true)
      setCoordLead({
        x: event.changedTouches[0].clientX - coords.x,
        y: event.changedTouches[0].clientY - coords.y
      })
    }}
    onClick={() => setTracking(false)}
    onTouchEnd={() => setTracking(false)}
    onMouseMove={(event) => {
      if(tracking) {
        setCoords({
          x: event.clientX - coordLead.x,
          y: event.clientY - coordLead.y
        })
      }
    }}
    onTouchMove={(event) => {
      if(tracking) {
        setCoords({
          x: event.changedTouches[0].clientX - coordLead.x,
          y: event.changedTouches[0].clientY - coordLead.y
        })
      }
    }}
    onMouseOut={() => setTracking(false)}
    onTouchCancel={() => setTracking(false)}
  />)
}

export { parseSearch, isEmpty, isObject, Nugget, Slab, Dragger };
