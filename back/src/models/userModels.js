const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ["admin", "user", "subscribedUser"],
    default: "user",
  },
  // subscribtion: {
  //   status: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   type: {
  //     type: String,
  //     enum: ["basic", "premium"],
  //     default: "basic",
  //   },
  // },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(this.password, salt);
  this.password = hassedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
