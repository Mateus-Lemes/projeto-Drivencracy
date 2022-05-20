import { Router } from "express";
import { choiceCreatedController, getChoices } from "../Controllers/choiceController.js";
import { validationChoiceCreated } from "../Middlewares/validationChoice.js";
import { validationPollChoice } from "../Middlewares/validationPollChoice.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validationChoiceCreated, choiceCreatedController); //opção cadastrada
choiceRouter.get("/poll/:id/choice", validationPollChoice, getChoices); //opções de uma enquete
choiceRouter.post("/choice/:id/vote", ); //votar em uma opção

export default choiceRouter;