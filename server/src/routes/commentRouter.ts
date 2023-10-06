import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsByPost,
  likeComment,
  unLikeComment,
  updateComment,
} from "../controllers/commentCtrl";
const router: Router = Router();

router.post("/", authMiddleware, createComment);
router.get("/", authMiddleware, getComments);
router.get("/:id", authMiddleware, getCommentsByPost);

router.post("/like/:id", authMiddleware, likeComment);
router.post("/unlike/:id", authMiddleware, unLikeComment);
router.patch("/update", authMiddleware, updateComment);
router.delete("/delete/:id", authMiddleware, deleteComment);

export default router;
