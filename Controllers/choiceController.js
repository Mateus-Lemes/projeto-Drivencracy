import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function choiceCreatedController(req, res) {
    try {
        const choiceCreated = req.body;
        const { title } = choiceCreated;
        const choiceWhitVote = {...choiceCreated, vote: 0};

        const oldTitle = await db.collection("choices").findOne({title});
        if (oldTitle) {
            return res.status(409).send("Já existe uma opção com esse título, por favor, escolha outro!")
        }

        db.collection("choices").insertOne(choiceWhitVote);
        res.status(201).send("Escolha criada com sucesso!");

    } catch (error) {
        res.sendStatus(error.status);
    }
}

export async function getChoices(req, res) {
    try {
        console.log("entrou")
        const pollId = req.params.id

        const choices = await db.collection("choices").find({pollId}).toArray();
        console.log(choices)

        if(choices.length === 0) {
            return res.status(404).send("Enquete vazia! Crie suas opções");
        }

        res.status(200).send(choices);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function vote(req, res) {
    try {
        const id = req.params
        const choice = await db.collection("choices").findOne({_id: new ObjectId(id)});
        await db.collection("choices").updateOne({_id: new ObjectId(id)}, {$inc: {vote: 1}});
        await db.collection("choices").updateOne({_id: new ObjectId(id)}, {$set: {date: dayjs().format("DD-MM-YYYY hh:mm")}});
        const {title} = choice
        res.status(201).send(`Obrigado por votar! Sua escolha foi: ${title}`);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}