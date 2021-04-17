const db = require('../dataBase/MySQL').getInit();
module.exports = async () => {
    const O_Auth = db.getModel('O_Auth');
    const tokens = await O_Auth.findAll();
    await tokens.forEach((token) => {
        const {dataValues: {addTime}} = token;
        const currentDay = new Date().getDate();

        const tokenTime = addTime.split(' ');
        const tokenDay = tokenTime[2]

        const result = +currentDay - tokenDay;

        if (result > 3 || result <-22) {
            O_Auth.destroy({where: { addTime }})
        }
    })
}
