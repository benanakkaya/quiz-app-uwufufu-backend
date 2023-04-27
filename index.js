import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import QuizRouter from "./routes/Quiz.js";
import ChoiceRouter from "./routes/Choice.js";
import CommentRouter from "./routes/Comment.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => res.send("QUIZ APP BACKEND"));
app.use("/user", UserRouter);
app.use("/quiz", QuizRouter);
app.use("/choice", ChoiceRouter);
app.use("/comment", CommentRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch((err) => {
      console.log(err);
    });
});
