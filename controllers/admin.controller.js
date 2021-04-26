const { messages, errorCodes } = require('../constants');
const {userService} = require('../service');
const {transactionInst} = require('../dataBase/MySQL').getInit();
module.exports = {
    changeRole: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { body: { role }, params: { id } } = req;

            await userService.addChangeToUser(id, role, transaction)
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
