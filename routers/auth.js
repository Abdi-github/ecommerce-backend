import express from "express";
import { signin, signup } from "../controller/auth.js";
import {
  isValidated,
  signinValidator,
  signupValidator,
} from "../validators/validator.js";

const authRouter = express.Router();

authRouter.post("/signup", signupValidator, isValidated, signup);
authRouter.post("/signin", signinValidator, isValidated, signin);
// authRouter.post("/profile", authSignin, (req, res) => {
//   res.status(200).send({ user: "profile" });
// });

export default authRouter;
