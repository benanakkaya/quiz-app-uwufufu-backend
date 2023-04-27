import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const UserRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const emailCheck = await User.findOne({ email });
  if (emailCheck) {
    return res.status(400).json({ message: "Bu mail zaten kayıtlı" });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ message: "Bu kullanıcı zaten kayıtlı" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  newUser.password = await bcryptjs.hash(password, 10);
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "SECRET_KEY", {
    expiresIn: "1d",
  });
  res.status(201).json({
    message: "Kayıt başarılı!",
    token,
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      quizzes: newUser.quizzes,
    },
  });
};

export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Kullanıcı bulunamadı" });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Lütfen parolanızı kontrol edin" });
  }
  const token = jwt.sign({ _id: user._id }, "SECRET_KEY", { expiresIn: "1d" });
  res.status(200).json({
    message: "Giriş başarılı!",
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const getUserData = async (req, res) => {
  const { id } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "Hatalı token" });
  }

  return res.status(200).json(user);
};
