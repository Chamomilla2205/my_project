const jwt = require('jsonwebtoken');
const { userService, authService } = require('../service');
const { passwordHelper } = require('../helpers')
const { JWT_ACCESS, JWT_REFRESH, JWT_CONFIRM } = require('../config/config');

const { AUTHORIZATION } = require('../constants/constants')

const { errorCodes, messages } = require('../constants')
module.exports = {
    checkUser: (value) => async (req, res, next) => {
        try {
            const { body: { email, password } } = req;
            let user = await userService.getOneUser({ email })

            if (!user) {
                user = await userService.getDeletedUser({ email });
                if (!user) {
                    throw new Error(messages.ACCESS_FAILURE);
                }
            }

            if (value !== 'restore') {
                await passwordHelper.compare(password, user.password);
            }
            req.profile = user;
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = await req.get(AUTHORIZATION);
            if (!access_token) {
                throw new Error(messages.TOKEN_IS_REQUIRED)
            }

            jwt.verify(access_token, JWT_ACCESS, (err) => {
                if (err) {
                    res.status(errorCodes.UNAUTHORIZED).json(err.message)
                }
            });

            const { dataValues } = await authService.checkToken({ access_token })

            req.tokens = dataValues;

            next()
        } catch (error) {
            res.status(errorCodes.UNAUTHORIZED).json(error.message)
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = await req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(messages.TOKEN_IS_REQUIRED)
            }


            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    res.status(errorCodes.UNAUTHORIZED).json(err.message)
                }
            });

            const { dataValues } = await authService.checkToken({ refresh_token })

            req.tokens = dataValues;

            next()
        } catch (error) {
            res.status(errorCodes.UNAUTHORIZED).json(error.message)
        }
    },

    userCanDelete: async (req, res, next) => {
        try {
            const { tokens, params: { userId } } = req;

            if (tokens.userId.toString() !== userId.toString()) {
                throw new Error(messages.DELETE_ERROR)
            }
            next()
        } catch (error) {
            res.status(errorCodes.UNAUTHORIZED).json(error.message)
        }
    },

    checkConfToken: async (req, res, next) => {
        try {
            const { query: { confirm_token } } = req;

            const { dataValues } = await authService.getConfToken(confirm_token);

            if (!dataValues) {
                throw new Error('Confirm token is not available')
            }

            jwt.verify(confirm_token, JWT_CONFIRM, (err) => {
                if (err) {
                    res.status(errorCodes.UNAUTHORIZED).json(messages.TOKEN_IS_REQUIRED)
                }
            });
            req.tokens = dataValues;
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
