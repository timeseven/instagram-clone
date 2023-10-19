import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  createPost,
  getPosts,
  getOnePost,
  getExplorePosts,
  getUserPosts,
  getSavedPost,
  likePost,
  unlikePost,
  updatePost,
  deletePost,
} from "../controllers/postCtrl";
const router: Router = Router();

router.get("/", authMiddleware, getPosts);
router.get("/explore", authMiddleware, getExplorePosts);
router.get("/:id", authMiddleware, getOnePost);
router.get("/user/:username", authMiddleware, getUserPosts);
router.get("/save/:username", authMiddleware, getSavedPost);
router.post("/", authMiddleware, createPost);
router.put("/like/:id", authMiddleware, likePost);
router.put("/unlike/:id", authMiddleware, unlikePost);
router.put("/update", authMiddleware, updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);

export default router;
