import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import { uploadImagesPost } from "../controllers/uploadImgCtrl";
import { imgResize, uploadPhoto } from "../middleware/uploadImage";
const router: Router = Router();

router.post("/post", uploadPhoto.array("images", 10), imgResize, uploadImagesPost);

export default router;
