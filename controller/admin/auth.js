import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";

export const signup = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    username: Math.random().toString(),
    role: "admin",
  });
  const createdUser = await user.save();
  if (createdUser) {
    res.send({
      message: "Admin created successfully!",
    });
  }
});

export const signin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.authenticate(req.body.password) && user.role === "admin") {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const { _id, firstName, lastName, email, role, fullName } = user;
      res.status(200).send({
        token,
        user: { _id, firstName, lastName, email, role, fullName },
      });
    } else {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  } else {
    return res.status(401).send({ message: "Something went wrong" });
  }
});

// ADD MIDDLEWARE FOR AUTHENTICATED USERS

export const authSignin = expressAsyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
});
