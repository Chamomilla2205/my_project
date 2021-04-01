const db = require('../dataBase/MySQL').getInit();

module.exports ={
    getAllUsers: async () => {
        const User = db.getModel('User');

        return User.findAll();
    },

    getOneUser: async (findObj) => {
        const User = db.getModel('User');

        const {} = await User.findOne({where: findObj}) || {};
    },

    createNewUser: async (userObj) => {
        const User = db.getModel('User');

        User.create(userObj)
    }
}
