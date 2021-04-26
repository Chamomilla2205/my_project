module.exports = {
    PORT: process.env.PORT ,
    JWT_ACCESS: process.env.JWT_SECRET_ACCESS,
    JWT_REFRESH: process.env.JWT_SECRET_REFRESH,
    JWT_CONFIRM: process.env.JWT_SECRET_CONFIRM,

    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,

    SENTRY_DSN: process.env.SENTRY_DSN
}
