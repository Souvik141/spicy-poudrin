/**
 * @description     : reserve model action module with user authentication actions
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
import Reserve from "../models/reserve-model.js";

/**
 * @DESC    Add reserve
 * @ROUTE   POST /api/reserves/add
 * @ACCESS  Private
 */
const addReserve = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var data = req.body;
  data.entity = verifyToken(token);
  var newReserve;
  try {
    newReserve = await Reserve.create(data);
  }
  catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: "Invalid, or missing entered data" });
  }
  // if (!newReserve) {
  //   res.status(401);
  //   res.json({ message: "Invalid, or missing entered data" });
  // }
  const reserves = await Reserve.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  res.json({
    reserves: reserves
  });
});

/**
 * @DESC    Fetch reserve
 * @ROUTE   GET /api/reserves
 * @ACCESS  Private
 */
const fetchReserves = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var filter = {
    entity: entity._id,
  };
  const reserves = await Reserve.find(
    filter
  ).sort([["date", -1]]);
  res.json({
    reserves: reserves
  });
});

/**
 * @DESC    Update reserve
 * @ROUTE   POST /api/reserves/
 * @ACCESS  Private
 */
const updateReserve = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var reserve = req.body;
  await Reserve.updateOne(
    {
      _id: reserve._id,
      entity: entity._id,
    },
    {
      date: reserve.date,
      amount: reserve.amount,
      type: reserve.type,
      brief: reserve.brief,
      description: reserve.description,
    }
  );
  const reserves = await Reserve.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  res.json({
    reserves: reserves
  });
});

/**
 * @DESC    Delete reserve
 * @ROUTE   DELETE /api/reserves/
 * @ACCESS  Private
 */
const deleteReserve = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (!entity) {
    res.status(404);
    res.json({ message: "Entity not found" });
  }
  var reserve = req.body;
  await Reserve.deleteOne({
    _id: reserve._id,
    entity: entity._id,
  });
  const reserves = await Reserve.find(
    {
      entity: entity._id,
    },
    "date amount type brief description"
  ).sort([["date", -1]]);
  res.json({
    reserves: reserves
  });
});

export {
  addReserve,
  fetchReserves,
  updateReserve,
  deleteReserve,
};
