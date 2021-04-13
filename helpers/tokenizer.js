const jwt = require('jsonwebtoken');

const {JWT_ACCESS, JWT_REFRESH, JWT_CONFIRM} = require('../config/config')

module.exports = {
    authTokens: () => {
        const access_token = jwt.sign({}, JWT_ACCESS, {expiresIn: '10min'});
        const refresh_token = jwt.sign({}, JWT_REFRESH, {expiresIn: '1d'});

        return {
            access_token,
            refresh_token
        }
    },
    confirmToken: () => jwt.sign({}, JWT_CONFIRM, {expiresIn: '1d'})
}
