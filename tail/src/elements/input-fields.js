import { useEffect, useState, useRef } from "react";
import downArrow from "../stocks/down-arrow.svg";

/**
 * @description     : wrapper for input type fields
 * @author          : Sav
 * @group           : input components
 * @lastModifiedOn  : 05-06-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  05-06-2021  Sav         Input fields { Drawer, ControlDrawer, Text, Date, Number, TextArea }
 */

/**
 * Concern :
 * In drawer the onBlur component gets called before the onCLick gets called on choice, this is now resolved by
 * using a delay of 100ms before collapsing the choices
 */
const Drawer = ({ dataSet, label, choice, onChange, placeholder }) => {
  const searchInput = useRef(undefined);
  const [thisChoice, setValue] = useState(choice);
  const [collapsed, collapse] = useState(true);
  const [highlighted, highlight] = useState(undefined);
  const [thisDataSet, setDataSet] = useState(dataSet || []);
  useEffect(() => {
    if (
      thisChoice === undefined ||
      thisChoice.label === undefined ||
      thisChoice.label === ""
    ) {
      setDataSet(dataSet);
      return;
    }
    var dataSetClone = [];
    dataSet.forEach((each) => {
      const compareIp = thisChoice.label.toLowerCase();
      const compareDb = each.label.toLowerCase();
      if (compareDb.includes(compareIp)) {
        dataSetClone.push(each);
      }
    });
    setDataSet(dataSetClone);
  }, [thisChoice]);
  return (
    <>
      {label !== undefined && <label>{label}</label>}
      <div className={"drawer-container " + highlighted}>
        <div className="drawer-mainframe">
          <input
            className="drawer-search"
            placeholder={placeholder}
            value={thisChoice && thisChoice.label}
            ref={searchInput}
            onFocus={() => {
              collapse(false);
              highlight("focused");
            }}
            onBlur={() => {
              setTimeout(() => collapse(true), 100);
              highlight(undefined);
            }}
            onChange={(event) => setValue({ label: event.target.value })}
          />
          <div className="element-break" />
          <img
            className="drawer-control"
            alt="drawer-control"
            src={downArrow}
            onClick={() => searchInput.current.focus()}
          />
        </div>
        {!collapsed && (
          <>
            <div className="drawer-dataset">
              {thisDataSet === undefined || thisDataSet.length === 0 ? (
                <div className="blank-dataset">
                  <span>No choices</span>
                </div>
              ) : (
                thisDataSet.map((each) => {
                  return (
                    <div
                      className="drawer-choice"
                      onClick={() => {
                        setValue(each);
                        onChange(each);
                        collapse(true);
                        highlight(undefined);
                      }}
                      key={each.value}
                    >
                      <span>{each.label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const CustomDrawer = ({ dataSet, label, choice, onChange, placeholder }) => {
  const searchInput = useRef(undefined);
  const [thisChoice, setValue] = useState(choice);
  const [collapsed, collapse] = useState(true);
  const [highlighted, highlight] = useState(undefined);
  const [thisDataSet, setDataSet] = useState(dataSet || []);
  useEffect(() => {
    if (thisChoice === undefined || thisChoice === "") {
      setDataSet(dataSet);
      return;
    }
    var dataSetClone = [];
    var isAlready = false;
    dataSet.forEach((each) => {
      const compareIp = thisChoice.toLowerCase();
      const compareDb = each.toLowerCase();
      if (compareDb === compareIp) isAlready = true;
      if (compareDb.includes(compareIp)) {
        dataSetClone.push(each);
      }
    });
    if (!isAlready) dataSetClone.unshift(thisChoice);
    setDataSet(dataSetClone);
  }, [thisChoice]);
  return (
    <>
      {label !== undefined && <label>{label}</label>}
      <div className={"drawer-container " + highlighted}>
        <div className="drawer-mainframe">
          <input
            className="drawer-search"
            placeholder={placeholder}
            value={thisChoice}
            ref={searchInput}
            onFocus={() => {
              collapse(false);
              highlight("focused");
            }}
            onBlur={() => {
              setTimeout(() => collapse(true), 100);
              highlight(undefined);
            }}
            onChange={(event) => setValue(event.target.value)}
          />
          <div className="element-break" />
          <img
            className="drawer-control"
            alt="drawer-control"
            src={downArrow}
            onClick={() => searchInput.current.focus()}
          />
        </div>
        {!collapsed && (
          <>
            <div className="drawer-dataset">
              {thisDataSet === undefined || thisDataSet.length === 0 ? (
                <div className="blank-dataset">
                  <span>No choices</span>
                </div>
              ) : (
                thisDataSet.map((each) => {
                  return (
                    <div
                      className="drawer-choice"
                      onClick={() => {
                        setValue(each);
                        onChange(each);
                        collapse(true);
                        highlight(undefined);
                      }}
                      key={each}
                    >
                      <span>{each}</span>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

/**
 * Concern :
 * Used a div "gesture-reference" to collapse the dropdown when the mouse is off clicked
 */
const ControlDrawer = ({ actionSet }) => {
  const [collapsed, collapse] = useState(true);
  return (
    <div className="inline-action">
      <img
        className="inline-action-ico"
        alt="action-arrow"
        src={downArrow}
        onClick={() => collapse(!collapsed)}
      />
      {!collapsed && (
        <>
          <div className="gesture-reference" onClick={() => collapse(true)} />
          <div className="drawer-dataset">
            {actionSet === undefined ||
              actionSet.map((each) => {
                return (
                  <div
                    className="drawer-choice"
                    onClick={() => {
                      each.action();
                      collapse(true);
                    }}
                  >
                    <span>{each.label}</span>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

const Text = ({ label, value, onChange, placeholder }) => {
  const [thisValue, setValue] = useState(value);
  const [highlighted, highlight] = useState(undefined);
  return (
    <>
      {label !== undefined && <label>{label}</label>}
      <input
        className={highlighted}
        type="text"
        value={thisValue}
        onFocus={() => highlight("focused")}
        onBlur={() => highlight(undefined)}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </>
  );
};

const Date = ({ label, value, onChange }) => {
  const [thisValue, setValue] = useState(value);
  const [highlighted, highlight] = useState(undefined);
  return (
    <>
      {label !== undefined && <label>{label}</label>}
      <input
        className={highlighted}
        type="date"
        value={thisValue}
        onFocus={() => highlight("focused")}
        onBlur={() => highlight(undefined)}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
      />
    </>
  );
};

const Number = ({ label, value, onChange, placeholder }) => {
  const [thisValue, setValue] = useState(value);
  const [highlighted, highlight] = useState(undefined);
  return (
    <>
      {label !== undefined && <label>{label}</label>}
      <input
        className={highlighted}
        type="number"
        value={thisValue}
        onFocus={() => highlight("focused")}
        onBlur={() => highlight(undefined)}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </>
  );
};

const TextArea = ({ dimens, label, value, onChange, placeholder }) => {
  const [thisValue, setValue] = useState(value);
  const [highlighted, highlight] = useState(undefined);
  return (
    <>
      {label !== undefined && <label>{label}</label>}
      <textarea
        rows={!dimens || !dimens[0] ? 1 : dimens[0]}
        cols={!dimens || !dimens[1] ? 1 : dimens[1]}
        className={highlighted}
        value={thisValue}
        onFocus={() => highlight("focused")}
        onBlur={() => highlight(undefined)}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </>
  );
};

const TextAreaView = ({ value }) => {
  if (!value) return <p></p>;
  const lineList = value.split("\n");
  return (
    <p>
      {lineList.map((each) => {
        return (
          <>
            {each}
            <br />
          </>
        );
      })}
    </p>
  );
};

const Email = ({ label, value, onChange, placeholder }) => {
  const [thisValue, setValue] = useState(value);
  const [highlighted, highlight] = useState(undefined);
  return (
    <div className="ip-email">
      {label !== undefined && <label>{label}</label>}
      <input
        className={highlighted}
        type="email"
        value={thisValue}
        onFocus={() => highlight("focused")}
        onBlur={() => highlight(undefined)}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

const Password = ({ label, value, onChange, placeholder, enableView }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [thisValue, setValue] = useState(value);
  const [highlighted, highlight] = useState(undefined);
  return (
    <div className="ip-password">
      {label !== undefined && <label>{label}</label>}
      <input
        className={highlighted}
        type={showPassword ? "text" : "password"}
        value={thisValue}
        onFocus={() => highlight("focused")}
        onBlur={() => highlight(undefined)}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={placeholder}
      />
      {enableView && (<div
        className={"show-pwd" + (showPassword ? " show-pwd-t" : "")}
        onClick={() => setShowPassword(!showPassword)}
      />)}
    </div>
  );
};

export {
  Drawer,
  CustomDrawer,
  ControlDrawer,
  Text,
  Date,
  Number,
  TextArea,
  TextAreaView,
  Email,
  Password,
};
