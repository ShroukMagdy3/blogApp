import { Router } from "express";
import * as UC from "./users.service.js";
import * as UV from "./user.validator.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";


const userRouter = Router();

userRouter.post(
  "/signup",
  validation(UV.signUpSchema),
  UC.signUp
);
userRouter.post(
  "/login",
  validation(UV.signInSchema),
  UC.signIn
);
userRouter.get("/profile" , authentication ,UC.getProfile )

export default userRouter