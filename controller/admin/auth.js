import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import bcrypt, { hash } from "bcrypt";

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
  const result = await User.findOne({ email: req.body.email })
    .select("email")
    .lean();

  if (result) {
    res.status(401).send({ message: "Email already exists" });
  } else {
    const createdUser = await user.save();
    if (createdUser) {
      res.send({
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        fullName: `${firstName} ${lastName}`,
        email: createdUser.email,
        username: createdUser.username,
        role: createdUser.role,
      });
    }
  }
});

export const signin = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.hash_password);
      if (cmp) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).send({
          token,
          _id,
          firstName,
          lastName,
          email,
          role,
          fullName: `${firstName} ${lastName}`,
        });
      } else {
        return res.status(400).send({ message: "Wrong password." });
      }
    } else {
      return res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).send("Internal Server error Occured");
  }
});
