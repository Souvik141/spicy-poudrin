/**
 * @description     : consists configurations of all the model actions
 * @author          : Sav
 * @group           : routes
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         with routes for default entity model actions { login,
 * register, get profile, update profile }
 * 2.0  05-06-2021  Sav         with routes for default deal model actions { add, fetch,
 * update, delete }
 */
import express from "express";
const router = express.Router();
import {
  authenticateEntity,
  registerEntity,
  getFigure,
  updateFigure,
} from "./actions/entity-actions.js";
import {
  addDeal,
  fetchDeals,
  updateDeal,
  deleteDeal,
} from "./actions/deal-actions.js";
import {
  addReserve,
  fetchReserves,
  updateReserve,
  deleteReserve,
} from "./actions/reserve-actions.js";
import { validate } from "./middleware.js";

router.post("/entity/login", authenticateEntity);
router.route("/entity/register").post(registerEntity);
router
  .route("/entity/figure")
  .get(validate, getFigure)
  .put(validate, updateFigure);

router.post("/deals/add", addDeal);
router
  .route("/deals/")
  .get(validate, fetchDeals)
  .post(validate, updateDeal)
  .delete(validate, deleteDeal);
router.route("/deals/:brief").get(validate, fetchDeals);

router.post("/reserves/add", addReserve);
router
  .route("/reserves/")
  .get(validate, fetchReserves)
  .post(validate, updateReserve)
  .delete(validate, deleteReserve);

export default router;
