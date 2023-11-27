import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const sendVerificationMail = async (email, token) => {
  const verificationLink = `http://localhost:8080/api/verify/${token}`;

  const mailOption = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    text: `Please click the following link to verify your email: ${verificationLink}`,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
