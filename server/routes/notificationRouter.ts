import express from "express";
import notificationCtrl from "../controllers/notificationCtrl";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/notification", auth, notificationCtrl.getNotification);

export default router;