import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import { uploadImagesPost, deleteImagesPost, getImagesPost } from "../controllers/uploadImgCtrl";
import { imgResize, uploadPhoto } from "../middleware/uploadImage";
const router: Router = Router();

router.post("/post", uploadPhoto.array("images", 10), uploadImagesPost);
router.post("/transfer/post", authMiddleware, getImagesPost);
router.delete("/delete-img/post/:id", authMiddleware, deleteImagesPost);

export default router;
