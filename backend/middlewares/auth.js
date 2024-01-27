var config = require("config");
var jwt = require("jsonwebtoken");
var { User } = require("../models/user");
async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied. No token provided");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findById(user.id);
  } catch (err) {
    return res.status(400).send("Invalid token");
  }

  next();
}
module.exports = auth;
