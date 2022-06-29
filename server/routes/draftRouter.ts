import express from "express";
import draftCtrl from "../controllers/draftCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/draft", auth, draftCtrl.createDraft);

router.get("/drafts/user/:id", auth, draftCtrl.getDraftsByUser);

router
  .route("/draft/:id")
  .get(draftCtrl.getDraft)
  .put(auth, draftCtrl.updateDraft)
  .delete(auth, draftCtrl.deleteDraft)
  .patch(auth, draftCtrl.createBlogdeleteDraft);

export default router;
