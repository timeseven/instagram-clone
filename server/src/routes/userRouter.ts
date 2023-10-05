import { Router } from "express";
import {} from "../controllers/authCtrl";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  searchUser,
  getUser,
  getSuggestionUser,
  followUser,
  unfollowUser,
  savePost,
  unSavePost,
} from "../controllers/userCtrl";

const router: Router = Router();

router.get("/search", searchUser);
router.get("/suggestions", authMiddleware, getSuggestionUser);
router.get("/:username", authMiddleware, getUser);

router.post("/follow/:id", authMiddleware, followUser);
router.post("/unfollow/:id", authMiddleware, unfollowUser);
router.post("/save-post/:id", authMiddleware, savePost);
router.post("/unsave-post/:id", authMiddleware, unSavePost);

export default router;
