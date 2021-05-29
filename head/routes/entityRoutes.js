/**
 * @description     : consists configurations of all the entity model actions
 * @author          : Sav
 * @group           : routes
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         with routes for default entity model actions { login, register, get profile, update profile }
 */
import express from "express";
const router = express.Router();
import {
  authenticateEntity,
  registerEntity,
  getFigure,
  updateFigure,
} from "../actions/entityActions.js";
import { validate } from "../middleware.js";

router.post("/login", authenticateEntity);
router.route("/register").post(registerEntity);
router.route("/figure").get(validate, getFigure).put(validate, updateFigure);

export default router;
