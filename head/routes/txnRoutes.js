import express from 'express'
const router = express.Router()
import {
  addTxn,
  getTxnList
} from '../actions/txnActions.js'

router.post('/addTxn', addTxn)
router.get('/txnList', getTxnList)

export default router