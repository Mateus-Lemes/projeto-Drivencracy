import { Router } from "express";
import { choiceCreatedController, getChoices, vote } from "../Controllers/choiceController.js";
import { validationChoiceCreated } from "../Middlewares/validationChoice.js";
import { validationPollChoice } from "../Middlewares/validationPollChoice.js";
import { validationVote } from "../Middlewares/validationVote.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validationChoiceCreated, choiceCreatedController); //opção cadastrada
choiceRouter.get("/poll/:id/choice", validationPollChoice, getChoices); //opções de uma enquete
choiceRouter.post("/choice/:id/vote", validationVote, vote); //votar em uma opção

export default choiceRouter;