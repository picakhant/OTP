import { userModel } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationMail } from "../utils/email.js";
dotenv.config();

//create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//user signup
const userRegister = async (req, res) => {
  const { name, acedamicYear, major, email, password } = req.body;
  try {
    const user = await userModel.signup(
      name,
      acedamicYear,
      major,
      email,
      password
    );

    const token = createToken(user._id);

    //send email verification
    sendVerificationMail(user.email, user.emailToken);

    return res.status(200).json({
      email: user.email,
      token,
      emailToken: user.emailToken,
      message: "Please verify your email.",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//verify user
const userVerify = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  try {
    const user = await userModel.verifyEmail(token);

    if (!user) {
      throw Error("Invalid token");
    }

    // Redirect to profile setup page or send a response based on your needs
    return res.send("Verify Successful");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export { userRegister, userLogin, userVerify };
