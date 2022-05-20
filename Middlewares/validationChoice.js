import { choiceSchema } from "../schema.js";

export function validationChoiceCreated(req, res, next) {
    const { error } = choiceSchema.validate(req.body);

    if (error) {
        console.log(error.details)
        return res.sendStatus(422);
    }

    next();
}