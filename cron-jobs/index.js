const cron = require('node-cron');
const tokenCleaner = require('./token.cleaner');

module.exports = () => {
    cron.schedule('0 12 1-28 1-12 *', async () => {
            await tokenCleaner()
        })
}
