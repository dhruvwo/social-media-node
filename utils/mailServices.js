const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "viraldeshle1234@gmail.com",
    pass: "sjsl ynsd taam dltj",
  },
});

const sendVerificationMail = async (token, email) => {
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: "no-reply@gmail.com",
        to: email,
        subject: "Account Verification",
        html: `<h2>Thank you choosing us.</h2><a href="http://localhost:5000/verify-account?token=${token}" target="_blank"><button>Verify</button></a>`,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendVerificationMail,
};
