const {SENTRY_DSN} = require('../config/config')

const Sentry = require('@sentry/node');

Sentry.init({
    dsn: SENTRY_DSN
})

module.exports = Sentry;
