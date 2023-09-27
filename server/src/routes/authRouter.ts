import { Router } from "express";
import { getCurrentUser, regUser } from "../controllers/authCtrl";

const router: Router = Router();

router.post("/register", regUser);
router.get("/", getCurrentUser);

export default router;
