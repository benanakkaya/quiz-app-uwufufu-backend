import express from "express";
import { UserRegister, UserLogin, getUserData } from "../controllers/User.js";

const route = express.Router();

route.post("/register", UserRegister);
route.post("/login", UserLogin);
route.post("/getUserData", getUserData);

export default route;
