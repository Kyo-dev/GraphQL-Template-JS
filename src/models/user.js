import mongoose from "mongoose";
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 15,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    validate: [
      validate({
        validator: "isAlphanumeric",
        message: "Username should contain alpha-numeric characters only",
      }),
      validate({
        validator: "isLength",
        arguments: [3, 15],
        message:
          "Username should be between {ARGS[0]} and {ARGS[1]} characters",
      }),
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validate({
      validator: "isEmail",
      message: "Email is invalid",
    }),
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
