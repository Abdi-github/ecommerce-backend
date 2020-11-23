import express from "express";
import multer from "multer";
import shortid from "shortid";
import { adminMiddleware, authSignin } from "../common-middleware.js";
import { createProduct } from "../controller/product.js";
// import { createproduct, getCategories } from "../controller/product.js";
import path from "path";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

productRouter.post(
  "/product/create",
  authSignin,
  adminMiddleware,
  upload.array("productPictures"),
  createProduct
);
// productRouter.get("/product/get", getCategories);

export default productRouter;
