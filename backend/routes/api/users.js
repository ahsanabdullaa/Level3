var express = require("express");
var router = express.Router();
var { User } = require("../../models/user");
var {
  validateUserSignup,
  validateUserLogin,
} = require("../../middlewares/validateUser");
var bcrypt = require("bcryptjs");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var config = require("config");
var nodemailer = require("nodemailer");
var transporter = require("../../middlewares/emailConfig");
/* GET users listing */
router.get("/", async function (req, res, next) {
  let users = await User.find();
  res.send(users);
});

/* GET single users listing. */
router.get("/:id", async function (req, res, next) {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User with given ID not found");
    res.send(user);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

/* Create user. */
router.post("/register", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    user = new User({ name, email, password });

    // Generate hashed password
    await user.generateHashedPassword();

    // Save the user to the database
    await user.save();

    // Generate email verification token
    const verificationToken = jwt.sign(
      { userId: user._id },
      config.get("jwtPrivateKey"),
      { expiresIn: "1d" }
    );

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // Respond with a success message
    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Helper function to send verification email
async function sendVerificationEmail(email, token) {
  try {
    // Define the email content
    const mailOptions = {
      from: "Piiza Online",
      to: email,
      subject: "Verify your email",
      text: `Click the following link to verify your email: http://localhost:4000/api/users/verify/${token}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

/* Verify user email */
router.get("/verify/:token", async function (req, res, next) {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send("User not found");

    // Mark the user as verified
    user.verifyEmail();
    await user.save();

    // Redirect to login page or send a success message
    res.redirect("http://localhost:3000/login");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// Login user.
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not registered");
  if (!user.isVerified) return res.status(400).send("Email not verified");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid password");
  let token = await jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

/* Update user. */
router.put("/:id", async function (req, res, next) {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User with given ID not found");
  user.name = req.body.name;
  user.save();
  res.send(user);
});

router.delete("/:id", async function (req, res, next) {
  let user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User with given ID not found");
  res.send(user);
});

// Forgot password - initiate reset
router.post("/forgetPass", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token using JWT
    const resetToken = jwt.sign(
      { userId: user._id },
      config.get("jwtPrivateKey"),
      { expiresIn: "1h" } // Token is valid for 1 hour
    );

    // Store the reset token in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token is valid for 1 hour
    await user.save();

    // Send the reset password email
    await sendResetPasswordEmail(user.email, resetToken);

    res.json({
      message: "Password reset initiated. Check your email for instructions.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Helper function to send reset password email
async function sendResetPasswordEmail(email, token) {
  try {
    // Define the email content
    const mailOptions = {
      from: "Pizza Online",
      to: email,
      subject: "Reset Your Password",
      text: `Click the following link to reset your password: http://localhost:3000/resetPass/${token}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
}

// Reset password
router.post("/resetPass/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    // Decode and verify the reset token
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    // Find the user by the decoded user ID and check expiration
    const user = await User.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the user's password and reset the resetToken fields
    user.password = password;

    // Generate hashed password
    await user.generateHashedPassword();

    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    console.log(user);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
