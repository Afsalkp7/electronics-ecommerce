const mongoose = require("mongoose");
const httpStatus = "http-status";
const userCollection = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/**
 * USER REGISTRATION
 */
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

/**
 * USER LOGIN
 */
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const userProfile = await userCollection.findOne({ email });
  if (!userProfile) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  try {
    if (userProfile.status == "active") {
      if (
        userProfile &&
        (await bcrypt.compare(password, userProfile.password))
      ) {
        const token = jwt.sign(
          { userId: userProfile._id },
          process.env.authSecretKey,
          { expiresIn: "1h" }
        );
        console.log(req.headers);
        return res.status(200).json({ token, userId: userProfile._id });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } else {
      return res.status(401).json({ error: "Admin blocked your account" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * SHOW USER PROFILE
 */
const showUser = async (req, res, next) => {
  try {
    const userDetails = await userCollection.findById(req.params.id);
    res.status(200).json(userDetails);
  } catch (err) {
    next(err);
  }
};

/**
 * EDIT USER DATA
 */
const userUpdate = async (req, res, next) => {
  const user_id = req.body._id;
  try {
    const updatedUser = await userCollection.findByIdAndUpdate(
      user_id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// /**
//  * USER LOGOUT
//  */
// const userLogout = async ( req , res ) => {
//     const token = req.headers.authorization;
//     if (token && !blacklist.includes(token)) {
//       blacklist.push(token);
//       return res.status(200).json({ message: 'Logout successful' });
//     } else {
//       return res.status(401).json({ error: 'Invalid or revoked token' });
//     }
// };

/**
 * USER PASSWORD CHANGE
 */
const passchange = async ( req , res , next ) => {
    try {

        const { userId , currentPassword , newPassword , confirmPassword} = req.body
        const user = await userCollection.findById(userId);
        console.log(user);
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
        const curPasswordMatch = await bcrypt.compare(
          currentPassword,
          user.password
        );
        if (!curPasswordMatch) {
          return res.status(401).send("Current password is incorrect....");
        }
        if (newPassword !== confirmPassword) {
          return res.status(400).send("New passwords do not match.....");
        }
    
        user.password = newPassword;
        const passUpdatedData = await user.save();
        res.clearCookie("usersession");
        return res.status(200).json(passUpdatedData);
      } catch (error) {
        console.log(error);
        next(error)
      }
}

/**
 * DELETE USER DATA
 */
const deleteUser = async ( req , res , next ) => {
    const _id = req.body.userId
    await userCollection.findOneAndDelete({ _id });
    res.clearCookie("usersession");
    return res.status(200).json({message:"user deleted succefully"});
}

module.exports = {
  userCreate,
  signIn,
  showUser,
  userUpdate,
  passchange,
  deleteUser
};
