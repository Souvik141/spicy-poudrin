/**
 * @description     : consists configurations of all the model actions
 * @author          : Sav
 * @group           : routes
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         with routes for default entity model actions { login, register, get profile, update profile }
 * 2.0  05-06-2021  Sav         with routes for default entity model actions { login, register, get profile, update profile }
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
  addTransaction,
  fetchTransactions,
  updateTransaction,
  deleteTransaction,
} from "./actions/transaction-actions.js";
import { validate } from "./middleware.js";

router.post("/entity/login", authenticateEntity);
router.route("/entity/register").post(registerEntity);
router
  .route("/entity/figure")
  .get(validate, getFigure)
  .put(validate, updateFigure);

router.post("/deals/add", addTransaction);
router
  .route("/deals/")
  .get(validate, fetchTransactions)
  .post(validate, updateTransaction)
  .delete(validate, deleteTransaction);
router.route("/deals/:brief").get(validate, fetchTransactions);

export default router;
