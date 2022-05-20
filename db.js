import { MongoClient } from "mongodb";

const mongo = new MongoClient(process.env.MONGO_URI);

await mongo.connect();

const db = mongo.db(process.env.DB);

export default db;