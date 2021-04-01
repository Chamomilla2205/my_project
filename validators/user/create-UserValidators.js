const Joi = require('joi');

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(255)
        .required(),
    age: Joi
        .number()
        .min(14)
        .max(120)
        .required(),
    gender: Joi
        .boolean()
        .required(),
    hobby: Joi
        .string()
        .alphanum()
        .min(3)
        .max(255)
        .required()
})
