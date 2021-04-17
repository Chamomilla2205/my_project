const Joi = require('joi');

module.exports = Joi.object({
    password: Joi
        .string()
        .min(3)
        .max(255)
        .required()
})
