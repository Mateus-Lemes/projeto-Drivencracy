import db from "../db.js";

export async function pollCreatedController(req, res) {
    try {
        const pollCreated = req.body;
        const {title} = pollCreated;
        const oldTitle = await db.collection("polls").findOne({title});
        if (!oldTitle) {
            await db.collection("polls").insertOne(pollCreated);
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
            res.sendStatus(200);
        }
            
    } catch (error) {
        res.sendStatus(error.status);
    }


    
}