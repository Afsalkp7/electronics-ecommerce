const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default : "active"
  },
  otp:{
    type : String,
  }
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const userCollection = new mongoose.model("userCollection", userSchema);

module.exports = userCollection;