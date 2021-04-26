const {userService} = require('../service')
const {userValidator} = require('../validators')
const {utils} = require('../helpers')
const {errorCodes, messages} = require('../constants')
module.exports = {
    checkIsUserExist: async (req,res,next) => {
        try {
            const {email, role} = req.body;
            let user = await userService.getOneNonActiveUser({email});
            if (!user) {
                user = await userService.getOneUser({email});
                if (!user) {
                    user = await userService.getDeletedUser({email});
                }
            }

            const { error } = await userValidator.createUserValidator.validate(req.body);

            if (user) {
                throw new Error(messages.USER_EXIST)
            }
            if (error) {
                throw new Error(error.details[0].message)
            }
            if (!role) {
                user = {...req.body, role: 'user'}
            }
            req.user = user;
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    checkUsersPass: async (req,res,next) => {
        try {
            const {password} = req.body;

            const {error} = await userValidator.changePassUserValidator.validate(password);

            if (error) {
                throw new Error(messages.DATA_FAILURE)
            }
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    normalizationUserData: async (req,res,next) => {
        try {
            const {name, email, phone} = req.body;
            if (name) {
                req.body.name = utils.nameNormalizator(name);
            }

            // if (email) {
            //     req.body.email = utils.nameNormalizator(email);
            // }
            next()
        } catch (error) {
            next(error)
        }
    }
}
