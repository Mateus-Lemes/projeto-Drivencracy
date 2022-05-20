import db from "../db.js";

export function validationPollChoice(req, res, next) {
    const pollId = req.params.id
    const pollIdExist = db.collection("polls").findOne({pollId});

    if (!pollIdExist ) {
        res.status(404).send("Enquete não encontrada!");
    }
    next()
}