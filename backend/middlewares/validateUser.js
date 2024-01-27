var { validateSignup, validateLogin } = require("../models/user");

function validateUserSignup(req, res, next) {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

function validateUserLogin(req, res, next) {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports.validateUserSignup = validateUserSignup;
module.exports.validateUserLogin = validateUserLogin;
