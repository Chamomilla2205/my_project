const Joi = require('joi');
const {constants} = require('../../constants')
module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(255),
    email: Joi
        .string()
        .min(3)
        .max(255),
    password: Joi
        .string()
        .min(3)
        .max(255),
    bornYear: Joi
        .number()
        .min(constants.CURRENT_YEAR - 120)
        .max(constants.CURRENT_YEAR - 14),
    role: Joi
        .string()
})
