const {userService} = require('../service')
const {userValidator} = require('../validators')

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
            console.log('HELLO FROM MIDDLEWARE')
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
