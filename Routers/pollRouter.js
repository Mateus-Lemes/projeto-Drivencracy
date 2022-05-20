import { Router } from "express";
import { pollCreatedController } from "../Controllers/pollController.js";
import { validationPollCreated } from "../Middlewares/validationPoll.js";

const pollRouter = Router();

pollRouter.post("/poll", validationPollCreated, pollCreatedController);
pollRouter.get("/poll", )

export default pollRouter;