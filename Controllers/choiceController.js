import db from "../db.js";
import { ObjectId } from "mongodb";

export async function choiceCreatedController(req, res) {
    try {
        const choiceCreated = req.body;
        const { pollId, title } = choiceCreated;

        const pollExist = await db.collection("polls").findOne({_id: new ObjectId(pollId)});
        console.log(pollExist)
        if(!pollExist) {
            return res.status(404).send("Não existe esta enquete!");
        }

        const oldTitle = await db.collection("choices").findOne({title});
        if (oldTitle) {
            return res.status(409).send("Já existe uma opção com esse título, por favor, escolha outro!")
        }

        db.collection("choices").insertOne(choiceCreated);
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