import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    acedamicYear: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    emailToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signup = async function (
  name,
  acedamicYear,
  major,
  email,
  password
) {
  if (!name || !acedamicYear || !major || !email || !password) {
    throw Error("Need to fill all field!");
  }

  if (acedamicYear === "empty") {
    throw Error("Please select your year!");
  }

  if (major === "empty") {
    throw Error("Please select your major!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email!");
  }

  //Check the email is already accounted
  const isExist = await this.findOne({ email });

  if (isExist) {
    throw Error("Email is already been used!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough. Must include string, number & special character!"
    );
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Generate a unique id for email token
  const emailToken = uuidv4();

  const user = await this.create({
    name,
    acedamicYear,
    major,
    email,
    password: hashedPassword,
    emailToken,
  });

  return user;
};

userSchema.statics.verifyEmail = async function (emailToken) {
  const user = await this.findOneAndUpdate(
    {
      emailToken: emailToken,
    },
    {
      $set: {
        isVerify: true,
        emailToken: null,
      },
    },
    { new: true }
  );

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Need to fill all field");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  //check user account by email
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("This email doesn't have account!");
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    throw Error("Wrong password");
  }

  return user;
};

export const userModel = mongoose.model("users", userSchema);
