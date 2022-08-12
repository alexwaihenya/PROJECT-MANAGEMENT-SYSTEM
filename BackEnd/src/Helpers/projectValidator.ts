import Joi from "joi";

export const projectSchema = Joi.object({
    project_name: Joi.string().required(),
    project_desc: Joi.string().required(),
    project_timeline: Joi.date().required()
})
