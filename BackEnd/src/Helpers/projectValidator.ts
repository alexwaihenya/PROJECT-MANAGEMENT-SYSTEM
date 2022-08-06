import Joi from "joi";

export const projectSchema = Joi.object({
    // projectId: Joi.number().required(),
    projectName: Joi.string().required(),
    projectDescription: Joi.string().required(),
    projectTimeLine: Joi.date().required()
})