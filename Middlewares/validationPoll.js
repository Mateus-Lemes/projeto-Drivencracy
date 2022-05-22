import { pollSchema } from "../schema.js";
import dayjs from "dayjs";

export function validationPollCreated(req, res, next) {
    let {expireAt, title} = req.body;
    console.log(expireAt)
    if(!expireAt) {
        expireAt = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");
    }

    res.locals.expireAt = expireAt;
    
    const { error } = pollSchema.validate({title, expireAt}, { abortEarly: false});

    if (error) {
        console.log(error.details)
        return res.sendStatus(422);
    }

    next();
}