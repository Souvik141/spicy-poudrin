/**
 * @description     : deal model action module with user authentication actions
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
import Deal from "../models/deal-model.js";

/**
 * @DESC    Add deal
 * @ROUTE   POST /api/deals/add
 * @ACCESS  Private
 */
const addDeal = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var data = req.body;
  data.entity = verifyToken(token);
  var newDeal;
  try {
    newDeal = await Deal.create(data);
  }
  catch (error) {
    res.status(401);
    res.json({ message: "Invalid, or missing entered data" });
  }
  if (!newDeal) {
    res.status(401);
    res.json({ message: "Invalid, or missing entered data" });
  }
  const deals = await Deal.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Deal.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    deals: deals,
    totalDealAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

/**
 * @DESC    Fetch deal
 * @ROUTE   GET /api/deals/:view
 * @ACCESS  Private
 */
const fetchDeals = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var key = req.params.brief;
  var filter = {
    entity: entity._id,
  };
  if (key) filter["brief"] = decodeURI(key);
  const deals = await Deal.find(
    filter,
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Deal.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    deals: deals,
    totalDealAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

/**
 * @DESC    Update deal
 * @ROUTE   POST /api/deals/
 * @ACCESS  Private
 */
const updateDeal = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var deal = req.body;
  await Deal.updateOne(
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
  const deals = await Deal.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Deal.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    deals: deals,
    totalDealAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

/**
 * @DESC    Delete deal
 * @ROUTE   DELETE /api/deals/
 * @ACCESS  Private
 */
const deleteDeal = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var deal = req.body;
  await Deal.deleteOne({
    _id: deal._id,
    entity: entity._id,
  });
  const deals = await Deal.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  const aggregateResult = await Deal.aggregate([
    { $match: { entity: entity._id } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: { $multiply: ["$type.value", "$amount"] } },
      },
    },
  ]);
  res.json({
    deals: deals,
    totalDealAmount: aggregateResult[0].totalAmount.toFixed(2),
  });
});

export {
  addDeal,
  fetchDeals,
  updateDeal,
  deleteDeal,
};
