import express from "express";
import balanceCtrl from "../controllers/balanceCtrl";
import auth from "../middleware/auth";
const router = express.Router();
router.patch("/secure_withdraw", auth, balanceCtrl.withdrawBalance);
router.get("/balance", auth, balanceCtrl.getBalance);

export default router;
