/**
 * @description     : model action module with user authentication actions
 * @author          : Sav
 * @group           : model actions
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         model action module with default user authentication actions { authenticateEntity, registerEntity, getFigure, updateFigure }
 */
import asyncHandler from "express-async-handler";
import { generateToken, verifyToken } from "../utils.js";
import Entity from "../models/entity-model.js";

/**
 * @DESC    Authenticate user
 * @ROUTE   POST /api/entity/login
 * @ACCESS  Public
 */
const authenticateEntity = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const entity = await Entity.findOne({ email });
  if (entity && (await entity.matchPassword(password))) {
    res.json({
      _id: entity._id,
      firstname: entity.firstname,
      lastname: entity.lastname,
      email: entity.email,
      tabs: entity.tabs,
      token: generateToken(entity._id),
    });
  } else {
    res.status(401);
    res.json({ message: "Invalid email or password" });
  }
});

/**
 * @DESC    Register user
 * @ROUTE   POST /api/entity/register
 * @ACCESS  Public
 */
const registerEntity = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const entityAlreadyExists = await Entity.findOne({ email });

  if (entityAlreadyExists) {
    res.status(400);
    throw new Error("Entity already exists");
  }

  const entity = await Entity.create({
    firstname,
    lastname,
    email,
    password,
  });

  if (entity) {
    res.status(200).json({
      _id: entity._id,
      firstname: entity.firstname,
      lastname: entity.lastname,
      email: entity.email,
      token: generateToken(entity._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid entity data");
  }
});

/**
 * @DESC    Fetch user profile
 * @ROUTE   GET /api/entity/figure
 * @ACCESS  Private
 */
const getFigure = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const entity = await Entity.findById(verifyToken(token));
  if (entity) {
    res.json({
      firstname: entity.firstname,
      lastname: entity.lastname,
      email: entity.email,
    });
  } else {
    res.status(404);
    throw new Error("Entity not found");
  }
});

/**
 * @DESC    Update user profile
 * @ROUTE   PUT /api/entity/figure
 * @ACCESS  Private
 */
const updateFigure = asyncHandler(async (req, res) => {
  const entity = await Entity.findById(req.entity._id);

  if (entity) {
    entity.firstname = req.body.firstname || entity.firstname;
    entity.lastname = req.body.lastname || entity.lastname;
    entity.email = req.body.email || entity.email;
    if (req.body.password) {
      entity.password = req.body.password;
    }

    const updatedEntity = await entity.save();
    res.json({
      _id: updatedEntity._id,
      firstname: updatedEntity.firstname,
      lastname: updatedEntity.lastname,
      email: updatedEntity.email,
      token: generateToken(updatedEntity._id),
    });
  } else {
    res.status(404);
    throw new Error("Entity not found");
  }
});

export { authenticateEntity, registerEntity, getFigure, updateFigure };
