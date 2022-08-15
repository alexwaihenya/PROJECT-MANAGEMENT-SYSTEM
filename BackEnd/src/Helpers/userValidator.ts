import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  
})

export const userLoginSchema =Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
    

})