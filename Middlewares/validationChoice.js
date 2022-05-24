import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from "../db.js";
import { choiceSchema } from "../schema.js";


export async function validationChoiceCreated(req, res, next) {
    const { error } = choiceSchema.validate(req.body);

    if (error) {
        console.log(error.details)
        return res.status(422).send("A opção precisa conter um título!");
    }

    const {pollId} = req.body
    const poll = await db.collection("polls").findOne({_id: new ObjectId(pollId)});

    if(!poll) {
        return res.status(404).send("Não existe esta enquete!");
    }

    const {expireAt} = poll
    if (dayjs().isAfter(dayjs(expireAt))) {
        return res.status(403).send("Essa enquete já expirou!");
    }

    next();
}