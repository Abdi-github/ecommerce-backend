import express from "express";
import { adminMiddleware, authSignin } from "../common-middleware.js";
import { createCategory, getCategories } from "../controller/category.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/category/create",
  authSignin,
  adminMiddleware,
  createCategory
);
categoryRouter.get("/category/get", getCategories);

export default categoryRouter;
