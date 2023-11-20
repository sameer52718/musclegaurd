import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

// ---------------------------------------------------------------PUBLIC FUNCTIIONS ----------------------------------------------------

export const userRegister = async (req, res, next) => {
  const { name, email, password, state, city, gendor, phone } = req.body;
  try {
    if (!name || !email || !password || !state || !city || !gendor || !phone) {
      return next(new ErrorHandler("All Feilds Are Required", 400));
    }
    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("Email is already in use", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const newUser = {
      name,
      password: hashedPassword,
      email,
      otp,
      state,
      city,
      gendor,
      phone,
    };

    await sendMail({
      template: EmailTempletes.otp,
      subject: "Otp For User Registration",
      otp,
      email,
      type: EmailEnums.otp,
    });

    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: "300s",
    });
    return res.json({ error: false, token });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// ---------------------------------------------------------------PUBLIC FUNCTIIONS ----------------------------------------------------
