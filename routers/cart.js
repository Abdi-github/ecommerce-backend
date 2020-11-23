import express from "express";
import { userMiddleware, authSignin } from "../common-middleware.js";
import { addToCart } from "../controller/cart.js";

const cartRouter = express.Router();

cartRouter.post("/user/cart/addtocart", authSignin, userMiddleware, addToCart);

export default cartRouter;
