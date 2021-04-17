const cron = require('node-cron');
const tokenCleaner = require('./token.cleaner');

module.exports = () => {
    cron.schedule('*/5 * * * * *', async () => {
            await tokenCleaner()
        })
}
