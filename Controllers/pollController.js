import dayjs from "dayjs";
import db from "../db.js";

export async function pollCreatedController(req, res) {
    try {
        const expireAt = res.locals.expireAt
        const {title} = req.body;
        const oldTitle = await db.collection("polls").findOne({title});
        if (!oldTitle) {
            await db.collection("polls").insertOne({
                title,
                expireAt: expireAt || dayjs().add(30, "day").format("YYYY-MM-D hh:mm")
            });
            res.status(201).send("Enquete criada com sucesso!");
        } else {
            res.status(409).send("Já existe uma enquete com esse título, por favor, escolha outro.")
        }
    } catch (error) {
        res.status(error.status).send(`erro ${error.status} no servidor`, console.log(error, error.status));
    }
}

export async function getPollsController(req, res) {
    try {
        const polls = await db.collection("polls").find({}).toArray();
        if(!polls) {
            res.status(404).send("Não foi encontrada nenhuma enquete!");
        } else {
            res.status(200).send(polls);
        }
            
    } catch (error) {
        res.sendStatus(error.status);
    }


    
}