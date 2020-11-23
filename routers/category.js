import express from "express";
import multer from "multer";
import shortid from "shortid";
import { adminMiddleware, authSignin } from "../common-middleware.js";
import { createCategory, getCategories } from "../controller/category.js";

const categoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

categoryRouter.post(
  "/category/create",
  authSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  createCategory
);
categoryRouter.get("/category/get", getCategories);

export default categoryRouter;
