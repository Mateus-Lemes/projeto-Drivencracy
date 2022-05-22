import dayjs from "dayjs";
import { ObjectId } from "mongodb";
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
        res.status(500).send(`erro 500 no servidor`, console.log(error, error.status));
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
        res.sendStatus(500);
    }
}

export async function getPollResult(req, res) {
    try {
        const {id} = req.params
        const poll = await db.collection("polls").findOne({_id: new ObjectId(id)});
        const choices = await db.collection("choices").find({pollId: (id)}).toArray();
        choices.sort((a, b)=> {
            return a.vote < b.vote
        });

        if(choices[0].vote === choices[1].vote ) {
           return res.send("Há duas ou mais opções empatadas!");
        }
        const result = {
            title: choices[0].title,
            vote: choices[0].vote
        }
        const winnerChoice = {...poll, result};
        res.status(200).send(winnerChoice);

    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }
}