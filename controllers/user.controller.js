const { passwordHelper } = require('../helpers');
const { userService, mailService, authService } = require('../service');
const { errorCodes, messages } = require('../constants')

const { transactionInst } = require('../dataBase/MySQL').getInit();

const {tokenizer} = require('../helpers')

const { USER_CREATED, USER_DELETED, PASSWORD_CHANGED, ACCOUNT_RESTORED } = require('../constants/emailActions.enum')
module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers()

            res.json(users)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.getOneUser({ id: userId })

            res.json(user)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(messages.FALSE_USER_ID)
        }
    },

    createNewUser: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { email, password, name } = req.user;
            const hashPass = await passwordHelper.hash(password);

            const confirmToken = tokenizer.confirmToken();

            const {id} = await userService.createUser({ ...req.user, password: hashPass }, transaction);

            const urlWithToken = `http://localhost:5000/users/${id}/activate?confirm_token=${confirmToken}`;

            const addTime = new Date();

            await authService.saveConfToken(
                { confirm_token: confirmToken, userId: id },
                addTime.toString(),
                transaction
            )

            await mailService.sendMail(email, USER_CREATED, { userName: name, urlWithToken });

            await transaction.commit();
            res.status(errorCodes.CREATED).json(messages.CREATED)
        } catch (err) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    activateAccount: async (req,res) => {
        const transaction = await transactionInst();
        try {
            const {params: { userId }} = req;

            const user = await userService.getOneNonActiveUser({ id: +userId });

            await userService.makeActive(user, transaction)

            await userService.removeFromNonActive({ id: +userId }, transaction);

            await authService.deleteConfToken(userId)

            await transaction.commit();
            res.json(messages.CREATED)
        } catch (error) {
            await transaction.rollback()
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    updateUser: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { body: { password }, profile: { id }, body } = req;

            if (password) {
                body.password = await passwordHelper.hash(password);
            }

            await userService.addChangeToUser(id, body, transaction);

            await transaction.commit()
            res.json(messages.CHANGED)
        } catch (error) {
            await transaction.rollback()
            res.status(errorCodes.UNAUTHORIZED).json(messages.TOKEN_IS_REQUIRED)
        }
    },

    changePass: async (req,res) => {
        const transaction = await transactionInst();
        try {
            const {body: { email, password }} = req;

            const hashPass = await passwordHelper.hash(password)

            const {id, name} = await userService.getOneUser({ email }, transaction)

            const confirmToken = tokenizer.confirmToken();

            const addTime = new Date();

            const urlWithToken = `http://localhost:5000/auth/forgotPass?confirm_token=${confirmToken}`;

            await authService.saveConfToken(
                { confirm_token: confirmToken , userId: id, newPass: hashPass},
                addTime.toString(),
                transaction
            )

            await mailService.sendMail(email, PASSWORD_CHANGED, {userName: name, urlWithToken})

                res.json(messages.SEND_CONFIRM_MESSAGE)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    addNewPass: async (req,res) => {
        const transaction = await transactionInst();
        try {
            const {userId, newPass} = req.tokens;

            const { id, ...user } = await userService.getOneUser({id: userId}, transaction)

            user.password = newPass;
            await userService.addChangeToUser(userId, user, transaction);

            await authService.deleteConfToken(userId, transaction)

            await transaction.commit()
            res.json(messages.CHANGED)
        } catch (error) {
            await transaction.rollback()
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    restoreUser: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const {
                body: { email, name },
                profile: {id},
                profile,
            } = req;

            await userService.makeActive(profile, transaction);

            await userService.removeFromDeleted(id)

            await mailService.sendMail(email, ACCOUNT_RESTORED, {userName: name})

            await transaction.commit()
            res.json(messages.RESTORED)
        } catch (error) {
            await transaction.rollback()
            res.status(errorCodes.UNAUTHORIZED).json(error.message)
        }
    },

    deleteUser: async (req, res) => {
        const transaction = await transactionInst()
        try {
            const { userId } = req.tokens;

            const user = await userService.getOneUser({ id: userId }, transaction);

            await userService.deleteUser(+userId, transaction);

            await userService.removeToDeleted(user, transaction)

            await mailService.sendMail(user.email, USER_DELETED, { userName: user.name });

            await transaction.commit();
            res.json(messages.DELETED);
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    }
}


