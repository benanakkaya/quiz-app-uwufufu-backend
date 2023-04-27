import express from "express";
import {
  DeleteQuiz,
  NewQuiz,
  GetQuiz,
  UpdateQuiz,
  GetAllQuizzes,
  GetEditQuiz,
  GetUserQuizzes,
  SearchQuiz,
} from "../controllers/Quiz.js";

const route = express.Router();

route.post("/new-quiz", NewQuiz);
route.post("/delete-quiz", DeleteQuiz);
route.post("/get-quiz", GetQuiz);
route.post("/search-quiz", SearchQuiz);
route.post("/get-edit-quiz", GetEditQuiz);
route.post("/update-quiz", UpdateQuiz);
route.get("/get-all-quizzes", GetAllQuizzes);
route.post("/get-user-quizzes", GetUserQuizzes);

export default route;
