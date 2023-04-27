import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "No available access token" });
    }

    req.user = await User.findById(jwt.verify(token, "SECRET_KEY")._id);

    next();
  } catch (error) {
    return res.status(401).send({ message: "No authorized" });
  }
};

export { authenticateToken };
