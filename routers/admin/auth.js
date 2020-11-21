import express from "express";
import { signin, signup } from "../../controller/admin/auth.js";
import {
  isValidated,
  signinValidator,
  signupValidator,
} from "../../validators/validator.js";

const adminRouter = express.Router();

adminRouter.post("/admin/signup", signupValidator, isValidated, signup);
adminRouter.post("/admin/signin", signinValidator, isValidated, signin);

export default adminRouter;
