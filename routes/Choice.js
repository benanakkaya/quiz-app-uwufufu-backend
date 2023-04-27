import express from "express";
import {
  ChampChoice,
  DeleteChoice,
  LosingChoice,
  NewChoice,
  WinningChoice,
  EditChoice,
  GetGameChoices,
} from "../controllers/Choice.js";

const route = express.Router();

route.post("/new-choice", NewChoice);
route.post("/edit-choice", EditChoice);
route.post("/delete-choice", DeleteChoice);
route.post("/winning-choice", WinningChoice);
route.post("/losing-choice", LosingChoice);
route.post("/champ-choice", ChampChoice);
route.post("/get-game-choices", GetGameChoices);

export default route;
