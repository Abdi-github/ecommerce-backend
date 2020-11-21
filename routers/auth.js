import express from "express";
import { authSignin, signin, signup } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/profile", authSignin, (req, res) => {
  res.status(200).send({ user: "profile" });
});

export default authRouter;
