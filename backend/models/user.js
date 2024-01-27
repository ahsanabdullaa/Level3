var mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  resetToken: String,
  resetTokenExpiration: Date,
  role: { type: String, default: "user" }, // 'user' or 'admin'
});

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.methods.verifyEmail = function () {
  this.isVerified = true;
};

const User = mongoose.model("User", userSchema);
// validate user signup
function validateUserSignup(user, { abortEarly = false } = {}) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),

    role: Joi.string(),
  });
  return schema.validate(user);
}
// validate user login
function validateUserLogin(user, { abortEarly = false } = {}) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
}
module.exports.User = User;
module.exports.validateSignup = validateUserSignup;
module.exports.validateLogin = validateUserLogin;
