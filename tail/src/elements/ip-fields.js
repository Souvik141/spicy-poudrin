import { useEffect, useState } from "react";
import downArrow from "../stocks/down-arrow.svg";

const Drawer = ({ dataSet, label, value, onChange, placeholder }) => {
    const [thisValue, setValue] = useState(value)
    const [collapsed, collapse] = useState(true)
    const [highlighted, highlight] = useState(undefined)
    const [thisDataSet, setDataSet] = useState(dataSet || [])
    useEffect(() => {
        console.log(thisValue.label);
        if(thisValue === undefined
            || thisValue.label === undefined
            || thisValue.label === '') {
            setDataSet(dataSet)
            return
        }
        var dataSetClone = []
        thisDataSet.forEach((each) => {
            if(each.label.includes(thisValue.label)) {
                dataSetClone.push(each)
            }
        })
        setDataSet(dataSetClone)
    }, [thisValue])
    return (
        <>
            { label !== undefined && (<label>{label}</label>)}
            <div className={'drawer-container ' + highlighted}>
                <div className='drawer-mainframe'>
                    <input
                        className='drawer-search'
                        placeholder={placeholder}
                        value={thisValue && thisValue.label}
                        onFocus={() => {
                                collapse(false)
                                highlight('focused')
                            }
                        }
                        onBlur={() => {
                                collapse(true)
                                highlight(undefined)
                            }
                        }
                        onChange={(event) => setValue({label: event.target.value})}
                    />
                    <div className='element-break' />
                    <img
                        className='drawer-control'
                        alt='drawer-control'
                        src={downArrow}
                        onClick={() => {
                                collapse(!collapsed)
                                highlight('focused')
                            }
                        }
                    />
                </div>
                {!collapsed && (
                    <>
                        <div className='drawer-dataset'>
                            {(thisDataSet === undefined
                            || thisDataSet.length === 0)
                            ? (<div className='blank-dataset'>
                                <span>No choices</span>
                            </div>)
                            : thisDataSet.map((each) => {
                                return (
                                    <div
                                        className='drawer-choice'
                                        onClick={() => {
                                                console.log(each);
                                                setValue(each)
                                                onChange(each)
                                                collapse(true)
                                                highlight(undefined)
                                            }
                                        }
                                        key={each.value}
                                    >
                                        {each.label}
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
            {!collapsed && (
                <div
                    className='gesture-reference'
                    onClick={() => {
                            collapse(!collapsed)
                            highlight(undefined)
                        }
                    }
                />
            )}
        </>
    );
}

const ControlDrawer = ({ actionSet }) => {
    const [value, setValue] = useState(undefined)
    const [collapsed, collapse] = useState(true)
    return (
        <div className='inline-action'>
            <img
                className='inline-action-ico'
                alt='action-arrow'
                src={downArrow}
                onClick={() => collapse(!collapsed)}
            />
            {!collapsed && (
                <>
                    <div className='gesture-reference' onClick={() => collapse(true)}/>
                    <div className='drawer-dataset'>
                        {actionSet.map((each) => {
                            return (<div
                                className='drawer-choice'
                                onClick={() => {
                                    setValue(each)
                                    each.action()
                                    collapse(true)
                                }}>{each.label}</div>)
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

const Text = ({ label, value, onChange, placeholder }) => {
    const [thisValue, setValue] = useState(value)
    const [highlighted, highlight] = useState(undefined)
    return (
        <>
            { label !== undefined && (<label>{label}</label>)}
            <input
                className={highlighted}
                type="text"
                value={thisValue}
                onFocus={() => highlight('focused')}
                onBlur={() => highlight(undefined)}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }
                }
                placeholder={placeholder}
            />
        </>
    )
}

const Date = ({ label, value, onChange }) => {
    const [thisValue, setValue] = useState(value)
    const [highlighted, highlight] = useState(undefined)
    return (
        <>
            { label !== undefined && (<label>{label}</label>)}
            <input
                className={highlighted}
                type="date"
                value={thisValue}
                onFocus={() => highlight('focused')}
                onBlur={() => highlight(undefined)}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }
                }
            />
        </>
    )
}

const Number = ({ label, value, onChange, placeholder }) => {
    const [thisValue, setValue] = useState(value)
    const [highlighted, highlight] = useState(undefined)
    return (
        <>
            { label !== undefined && (<label>{label}</label>)}
            <input
                className={highlighted}
                type="number"
                value={thisValue}
                onFocus={() => highlight('focused')}
                onBlur={() => highlight(undefined)}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }
                }
                placeholder={placeholder}
            />
        </>
    )
}

const TextArea = ({ label, value, onChange, placeholder }) => {
    const [thisValue, setValue] = useState(value)
    const [highlighted, highlight] = useState(undefined)
    return (
        <>
            { label !== undefined && (<label>{label}</label>)}
            <textarea
                rows='3'
                cols='50'
                className={highlighted}
                value={thisValue}
                onFocus={() => highlight('focused')}
                onBlur={() => highlight(undefined)}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                        onChange(event.target.value)
                    }
                }
                placeholder={placeholder}
            />
        </>
    )
}

export {
    Drawer,
    ControlDrawer,
    Text,
    Date,
    Number,
    TextArea
};