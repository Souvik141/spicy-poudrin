/**
 * @description     : consists middlewares for api requests
 * @author          : Sav
 * @group           : middleware
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         with validate middleware for validating authorization token
 */
import asyncHandler from "express-async-handler";
import Entity from "./models/entity-model.js";
import { verifyToken } from "./utils.js";

const validate = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      req.entity = await Entity.findById(verifyToken(token)).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { validate };
