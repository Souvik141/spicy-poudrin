import { useState } from "react";
import downArrow from "../stocks/down-arrow.svg";

const Drawer = ({ dataSet, fieldWidth }) => {
    const [value, setValue] = useState(undefined)
    const [collapsed, collapse] = useState(true)
    return (
        <div className='drawer-container' style={{width: fieldWidth}}>
            <div className='drawer-mainframe'>
                {value ?
                    (<div className='drawer-value-case'>{value.label}</div>)
                    : (<div className='drawer-placeholder'>Select...</div>)}
                <img
                    className='drawer-control'
                    alt='drawer-control'
                    src={downArrow}
                    onClick={() => collapse(!collapsed)}
                />
            </div>
            {!collapsed && (
                <>
                    {/* <div className='gesture-reference' onClick={() => collapse(true)}/> */}
                    <div className='drawer-dataset'>
                        {dataSet.map((each) => {
                            return (<div
                                className='drawer-choice'
                                onClick={() => {
                                    setValue(each)
                                    collapse(true)
                                }}>{each.label}</div>)
                        })}
                    </div>
                </>
            )}
        </div>
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
                                }}>{each.label}</div>)
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export {
    Drawer,
    ControlDrawer
};