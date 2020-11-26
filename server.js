import express from "express";
import dotenv from "dotenv";
// import nodemon from "nodemon";
import mongoose from "mongoose";
// import userRouter from "./routers/auth.js";
import authRouter from "./routers/auth.js";
import adminRouter from "./routers/admin/auth.js";
import categoryRouter from "./routers/category.js";
import productRouter from "./routers/product.js";
import cartRouter from "./routers/cart.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// mongoDB connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.psqzr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

const app = express();

app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
/*
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running",
  });
});
app.post("/data", (req, res) => {
  res.status(200).json({
    message: req.body,
  });
});
*/

app.listen(process.env.PORT, () => {
  console.log(`Serve at http://localhost:${process.env.PORT}`);
});
