const cron = require('node-cron');

module.exports = () => {
    cron.schedule('*/10 * * * * *', () => {
        console.log('EVERY TEN SEC')
    })
}