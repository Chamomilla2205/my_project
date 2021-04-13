const Joi = require('joi');
const {constants} = require('../../constants')
module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(255)
        .required(),
    email: Joi
        .string()
        .min(3)
        .max(255)
        .required(),
    password: Joi
        .string()
        .min(3)
        .max(255)
        .required(),
    bornYear: Joi
        .number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 14)
        .required(),
    hobby: Joi
        .string()
        .alphanum()
        .min(3)
        .max(255),
    role: Joi
        .string()
})
