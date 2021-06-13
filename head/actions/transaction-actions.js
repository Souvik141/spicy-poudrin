/**
 * @description     : transaction model action module with user authentication actions
 * @author          : Sav
 * @group           : model actions
 * @lastModifiedOn  : 05-06-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         model action module with default user authentication actions { authenticateEntity, registerEntity, getFigure, updateFigure }
 */
import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils.js";
import Entity from "../models/entity-model.js";
import Transaction from "../models/transaction-model.js";
import mongoose from "mongoose";

/**
 * @DESC    Add transaction
 * @ROUTE   POST /api/deals/add
 * @ACCESS  Private
 */
const addTransaction = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    throw new Error("Entity not found");
  }
  var data = req.body;
  data.entity = verifyToken(token);
  const newTransaction = await Transaction.create(data);
  if (!newTransaction) {
    res.status(400);
    throw new Error("Invalid entity data");
  }
  const transactions = await Transaction.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Transaction.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    transactions: transactions,
    totalTransactionAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

/**
 * @DESC    Fetch transaction
 * @ROUTE   GET /api/deals/:view
 * @ACCESS  Private
 */
const fetchTransactions = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    throw new Error("Entity not found");
  }
  var key = req.params.brief;
  var filter = {
    entity: entity._id,
  };
  if (key) filter["brief"] = decodeURI(key);
  const transactions = await Transaction.find(
    filter,
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Transaction.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    transactions: transactions,
    totalTransactionAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

/**
 * @DESC    Update transaction
 * @ROUTE   POST /api/deals/
 * @ACCESS  Private
 */
const updateTransaction = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    throw new Error("Entity not found");
  }
  var deal = req.body;
  await Transaction.updateOne(
    {
      _id: deal._id,
      entity: entity._id,
    },
    {
      date: deal.date,
      amount: deal.amount,
      type: deal.type,
      brief: deal.brief,
      description: deal.description,
    }
  );
  const transactions = await Transaction.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Transaction.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    transactions: transactions,
    totalTransactionAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

/**
 * @DESC    Delete transaction
 * @ROUTE   DELETE /api/deals/
 * @ACCESS  Private
 */
const deleteTransaction = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    throw new Error("Entity not found");
  }
  var deal = req.body;
  await Transaction.deleteOne({
    _id: deal._id,
    entity: entity._id,
  });
  const transactions = await Transaction.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Transaction.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    transactions: transactions,
    totalTransactionAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

export {
  addTransaction,
  fetchTransactions,
  updateTransaction,
  deleteTransaction,
};
