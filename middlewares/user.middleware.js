const {userService} = require('../service')
const {userValidator} = require('../validators')
module.exports = {
    checkIsUserExist: async (req,res,next) => {
        try {
            const {email} = req.body;
            const user = await userService.getOneUser({email});
            const { error } = await userValidator.createUserValidator.validate(req.body);
            if (user) {
                throw new Error('User exist')
            }
            if (error) {
                throw new Error(error.details[0].message)
            }
            next()
        } catch (error) {
            res.status(401).json('Some trouble')
        }
    }
}
