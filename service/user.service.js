const db = require('../dataBase/MySQL').getInit();

module.exports ={
    getAllUsers: async () => {
        const User = db.getModel('User');

        return User.findAll();
    },

    getOneUser: async (findObj, transaction) => {
        const User = db.getModel('User');

        const {dataValues} = await User.findOne({where: findObj, transaction}) || {};
        return dataValues;
    },

    createUser: async (userObj, transaction) => {
        const NonActivatedUser = db.getModel('NonActivatedUser');

        return NonActivatedUser.create(userObj, {transaction})
    },

    removeFromNonActive: async (userId, transaction) => {
        const NonActivatedUser = db.getModel('NonActivatedUser');

        await NonActivatedUser.destroy({ where: userId, transaction });
    },

    getOneNonActiveUser: async (userObj) => {
        const NonActivatedUser = db.getModel('NonActivatedUser')

        const {dataValues} = await NonActivatedUser.findOne({where: userObj}) || {};

        return dataValues;
    },

    makeActive: async (userObj, transaction) => {
        const User = db.getModel('User');

        return User.create(userObj, {transaction})
    },

    addChangeToUser: async (id, userObj, transaction) => {
        const User = db.getModel('User');

        return User.update(userObj, {where: { id } , transaction})
    },

    deleteUser: async (id, transaction) => {
        const User = db.getModel('User');

        return User.destroy({where: { id }, transaction })
    },

    removeToDeleted: async (userObj, transaction) => {
        const DeletedUser = db.getModel('DeletedUser');

        await DeletedUser.create(userObj, {transaction} )
    },

    removeFromDeleted: async (id, transaction) => {
        const DeletedUser = db.getModel('DeletedUser');

        return  DeletedUser.destroy({where: { id }, transaction});
    },

    getDeletedUser: async (findObj) => {
        const DeletedUser = db.getModel('DeletedUser');

        const {dataValues} = await DeletedUser.findOne({where: findObj}) || {};
        return dataValues;
    }
}
