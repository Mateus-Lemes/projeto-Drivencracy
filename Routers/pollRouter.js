import { Router } from "express";
import { getPollsController, pollCreatedController } from "../Controllers/pollController.js";
import { validationPollCreated } from "../Middlewares/validationPoll.js";

const pollRouter = Router();

pollRouter.post("/poll", validationPollCreated, pollCreatedController);
pollRouter.get("/poll", getPollsController)

export default pollRouter;