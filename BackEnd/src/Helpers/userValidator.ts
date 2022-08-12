import Joi from "joi";

export const userSchema =Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
    

})

export const userLogin =Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
    

})