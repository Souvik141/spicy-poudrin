import asyncHandler from 'express-async-handler'
import Txn from '../models/txn_m.js'

const addTxn = asyncHandler(async (req, res) => {
  const { date, amount, type, brief, description } = req.body

  const txn = await Txn.create({
    date,
    amount,
    type,
    brief,
    description
  })

  if (txn) {
    res.status(201).json({
      _id: txn._id,
      date: txn.date,
      amount: txn.amount,
      type: txn.type,
      brief: txn.brief,
      description: txn.description
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getTxnList = asyncHandler(async (req, res) => {
  const txns = await Txn.find({})
  res.json(txns)
})

export {
  addTxn,
  getTxnList
}