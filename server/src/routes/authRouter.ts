import { Router } from "express";
import {
  getCurrentUser,
  registerUser,
  logIn,
  logOut,
  handleRefreshToken,
  updateUser,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/authCtrl";
import { authMiddleware } from "../middleware/authMiddleWare";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", logIn);
router.post("/logout", logOut);

router.get("/", authMiddleware, getCurrentUser);
router.patch("/", authMiddleware, updateUser);
router.post("/refresh", handleRefreshToken);

router.post("/forgot-password", forgotPasswordToken);
router.post("/reset-password", resetPassword);

export default router;
