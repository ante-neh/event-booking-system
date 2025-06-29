import { Router } from "express";
import { refreshToken, signIn, signOut, signUp } from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { userSchema } from "../schema/user.schema";

const authRouter = Router();
authRouter.post("/sign-up", validationMiddleware(userSchema, 'body'), signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/sign-out", signOut)
authRouter.post("/refresh-token", refreshToken)

export { authRouter }