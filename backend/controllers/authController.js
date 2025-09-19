import { User } from "../models/user.models.js";
import { email } from "../models/emails.models.js";
import bcrypt from 'bcrypt';



export const signup = async (req, res) => {
  try {
    const { email, loginPassword, appPassword } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedLoginPassword = await bcrypt.hash(loginPassword, 10);

    const newUser = new User({
      email,
      loginPassword: hashedLoginPassword,
      appPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Email sent successfully', data: newUser });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const logIn = async (req, res) => {
  try {
    const { email, loginPassword } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) { return res.status(401).send('Email/Password incorrect') }
    const isMatch = await userExists.isLoginPasswordCorrect(loginPassword);
    if (!isMatch) { return res.status(401).send("Password is incorrect") }
    const accessToken = userExists.generateAccessToken();
    const refreshToken = userExists.generateRefreshToken();
    userExists.refreshToken = refreshToken;
    await userExists.save();
    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      email,
    })
  } catch (error) {
    console.log("Error: ", error);
  }
}
export const mails = async (req, res) => {
  try {
    const mails = await email.find({ userId: req.user._id })
      .select("to subject status -_id")
      .sort({ createdAt: -1 });

    res.json(mails);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}