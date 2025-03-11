import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";
import {
  getUserProfiles,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  switchActiveProfile,
} from "../controllers/profileController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public endpoints
router.post("/", createUser);         // POST /api/v1/users -> Register
router.post("/auth", loginUser);      // POST /api/v1/users/auth -> Login

// Auth-protected routes
router.use(authenticate);

router.post("/logout", logoutCurrentUser); // POST /api/v1/users/logout

// Admin only
router.get("/", authorizeAdmin, getAllUsers); // GET /api/v1/users -> admin fetch all

// Single main user profile
router
  .route("/profile")
  .get(getCurrentUserProfile)
  .put(updateCurrentUserProfile);

// Sub-profiles
router
  .route("/profiles")
  .get(getUserProfiles)
  .post(createUserProfile);

router
  .route("/profiles/:profileId")
  .put(updateUserProfile)
  .delete(deleteUserProfile);

router.post("/switch-profile", switchActiveProfile);

export default router;
