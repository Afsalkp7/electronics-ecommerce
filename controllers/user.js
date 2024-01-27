const mongoose = require("mongoose");
const userCollection = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const userCreate = async (req, res, next) => {
  const alreadyUser = await userCollection.findOne({ email: req.body.email });
  if (alreadyUser) {
    return res.status(409).json({ error: "Email already exists" });
  } else {
    try {
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      if (password === cpassword) {
        const { userName, email, phone, status } = req.body;
        const userData = new userCollection({
          userName,
          email,
          phone,
          password,
          status: status || "active",
        });
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
      } else {
        return res.status(409).json({ error: "Password is not match" });
      }
    } catch (error) {
      next(error);
    }
  }
};

const signIn = async (req, res ,next) => {
  const { email, password } = req.body;
  const userProfile = await userCollection.findOne({ email });
  if (!userProfile) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  try {
    if (userProfile.status == "active") {
      if (
        userProfile &&
        (await bcrypt.compare(password, userProfile.password))
      ) {
        const token = jwt.sign({ userId: userProfile._id }, 'electronics api token', { expiresIn: '1h' })

        res.json({ token, userId: userProfile._id });
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    } else {
        return res.status(401).json({ error: 'Admin blocked your account' });
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
};

module.exports = {
  userCreate,
  signIn,
};
