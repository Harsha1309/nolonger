import express from "express";
import notificationCtrl from "../controllers/notificationCtrl";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/nitification", auth, notificationCtrl.getNotification);

export default router;