import Joi from "joi";

export const signUpSchema = {
    body: Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ tlds: { allow: true }, minDomainSegments: 2 }).required(),
        password: Joi.string().required(),
        cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }).required(),
};

export const signInSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required(),
};