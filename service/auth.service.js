const db = require('../dataBase/MySQL').getInit();

module.exports = {
    getToken: async (tokens, userId, addTime) => {
        const O_Auth = db.getModel('O_Auth');

        return O_Auth.create({...tokens, userId, addTime});
    },
    getRefreshToken: async () => {

    },

    checkToken: async (token) => {
        const O_Auth = db.getModel('O_Auth');

        return O_Auth.findOne({where: token})
    },

    saveConfToken: async (token, addTime, transaction) => {
        const ConfirmToken = db.getModel('ConfirmToken');

        const {dataValues} = await ConfirmToken.create({ ...token, addTime, transaction });
        return dataValues;
    },

    deleteConfToken: async (userId) => {
        const ConfirmToken = db.getModel('ConfirmToken');

        return ConfirmToken.destroy({where: { userId }})
    },

    getConfToken: async (confirm_token) => {
        const ConfirmToken = db.getModel('ConfirmToken');

        return  ConfirmToken.findOne({where: { confirm_token }})
    }
}
