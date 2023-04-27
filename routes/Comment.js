import express from "express";
import { DeleteComment, NewComment } from "../controllers/Comment.js";

const route = express.Router();

route.post("/new-comment", NewComment);
route.post("/delete-comment", DeleteComment);

export default route;
