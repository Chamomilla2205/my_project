const { tokenizer } = require('../helpers');
const { authService } = require('../service');
const {transactionInst} = require('../dataBase/MySQL').getInit();

const {errorCodes} = require('../constants')
module.exports = {
    enterToAccount: async (req, res) => {
        const transaction = await transactionInst()
        try {
            const {profile: {id}} = req;
            const tokens = tokenizer.authTokens();

            const addTime = new Date();

            await authService.getToken(tokens, id, addTime.toString());
            await transaction.commit();
            res.json(tokens)
        } catch (error) {
            await transaction.rollback()
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    takeRefresh: async (req,res) => {
        const transaction = await transactionInst();
        try{
            const {userId} = req.tokens;
            const tokens = tokenizer.authTokens();

            const addTime = new Date();

            await authService.getToken(tokens, userId, addTime.toString())
            await transaction.commit()
            res.json(tokens)
        } catch (error) {
            await transaction.rollback()
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
}
