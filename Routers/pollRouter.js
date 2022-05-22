import { Router } from "express";
import { getPollResult, getPollsController, pollCreatedController } from "../Controllers/pollController.js";
import { validationPollCreated } from "../Middlewares/validationPoll.js";

const pollRouter = Router();

pollRouter.post("/poll", validationPollCreated, pollCreatedController);
pollRouter.get("/poll", getPollsController);
pollRouter.get("/poll/:id/result", getPollResult);

export default pollRouter;