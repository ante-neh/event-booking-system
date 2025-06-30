import { Router } from "express";
import {
  createUserProfile,
  deleteUserProfile,
  getUserProfile,
  getUserProfiles,
  updateUserProfile,
  updateUserRole
} from "../controllers/user-profile.contollers";
import { authenticate } from "../middlewares/authentication.middleware";
import { authorize } from "../middlewares/authorization.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { userProfileSchema, userProfileUpadetSchema, userQuerySchema, userRoleUpdateSchema } from "../schema/user-profile.schema";

const userProfileRouter = Router();
userProfileRouter.get("/:id", authenticate, getUserProfile);
userProfileRouter.get("/", authenticate, authorize(['admin']), validationMiddleware(userQuerySchema, 'query'), getUserProfiles);
userProfileRouter.post("/", authenticate, validationMiddleware(userProfileSchema, 'body'), createUserProfile);
userProfileRouter.patch("/:id", authenticate, validationMiddleware(userProfileUpadetSchema, 'body'), updateUserProfile);
userProfileRouter.delete("/:id", authenticate, authorize(['attendee', 'organizer']), deleteUserProfile);
userProfileRouter.patch("/:id/roles", authenticate, authorize(["admin"]), validationMiddleware(userRoleUpdateSchema, 'body'), updateUserRole)

export { userProfileRouter };