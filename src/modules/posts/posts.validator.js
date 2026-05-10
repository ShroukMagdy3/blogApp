import Joi from "joi";

export const createPostSchema = {
  body: Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    imageUrl: Joi.string().uri(),
    isPublic: Joi.boolean().default(true),
  }),
};

export const updatePostSchema = {
  body: Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(10),
    imageUrl: Joi.string().uri(),
    isPublic: Joi.boolean(),
  }),
};