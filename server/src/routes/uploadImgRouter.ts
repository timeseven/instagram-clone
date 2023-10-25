import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import { uploadImagesPost, deleteImagesPost, getImagesPost } from "../controllers/uploadImgCtrl";
import { imgResize, uploadContent } from "../middleware/uploadImage";
const router: Router = Router();

router.post("/post", uploadContent.array("postMedia", 10), uploadImagesPost);
router.post("/transfer/post", authMiddleware, getImagesPost);
router.post("/delete/post/", authMiddleware, deleteImagesPost);

export default router;
