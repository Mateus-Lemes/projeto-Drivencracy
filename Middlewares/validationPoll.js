import { pollSchema } from "../schema.js";

export function validationPollCreated(req, res, next) {
    const { error } = pollSchema.validate(req.body);

    if (error) {
        console.log(error.details)
        return res.sendStatus(422);
    }

    next();
}