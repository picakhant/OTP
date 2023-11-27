import express from "express";
import {
  userLogin,
  userRegister,
  userVerify,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/verify/:token", userVerify);

export default userRouter;
