import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Txn from '../elements/txn.js'
import {listTxns} from '../actions/txnActions.js'

const Cover = ({ history, match }) => {
    const dispatch = useDispatch()
    const txnState = useSelector((state) => state.txnState)
    const { txnList } = txnState
    useEffect(() => {
        if (!txnList) {
          dispatch(listTxns())
          dispatch({ type: 'TXN_LIST_RESET' })
        }
    }, [dispatch])
    const refList = txnList ? txnList : [];
    return (
        <div className='cover'>
            <ul>
                {refList.map(function(each) {
                    return (
                        <li key={each._id}>
                            <Txn txn={each}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Cover;