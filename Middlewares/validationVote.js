import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../db.js";

export async function validationVote(req, res, next) {
    const {id} = req.params
    const idExist = await db.collection("choices").findOne({_id: new ObjectId(id)});
    if(!idExist) {
        res.status(404).send("Opção não existe!");
    }

    const {pollId} = idExist
    const poll = await db.collection("polls").findOne({_id: new ObjectId(pollId)});
    const {expireAt} = poll
    if (dayjs().isAfter(dayjs(expireAt))) {
        return res.status(403).send("Essa enquete já expirou!");
    }
    next();
}