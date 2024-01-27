// emailConfig.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Update with your SMTP server details
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "ahsanidrees10@gmail.com", // replace with your email
    pass: "tcnm abql zfsl jbtd", // replace with your email password or an application-specific password
  },
});

module.exports = transporter;
