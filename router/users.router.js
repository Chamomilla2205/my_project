const router = require('express').Router();
const {userController} = require('../controllers')
const {userMiddleware, authMiddleware, fileMiddleware} = require('../middlewares')

router.route('/')
    .get(userController.getAllUsers)
    .post(
        fileMiddleware.checkFile,
        fileMiddleware.checkAvatar,
        userMiddleware.normalizationUserData,
        userMiddleware.checkIsUserExist,
        userController.createNewUser
    )

router.route('/:userId')
    .get(
        userController.getSingleUser
    )
    .delete(
        authMiddleware.checkAccessToken,
        authMiddleware.isUserIdOk,
        userController.deleteUser
    )
    .post(
        authMiddleware.checkAccessToken,
        authMiddleware.isUserIdOk,
        authMiddleware.checkUser('restore'),
        userController.restoreUser
    )
    .put(
        authMiddleware.checkAccessToken,
        authMiddleware.isUserIdOk,
        authMiddleware.checkUser(),
        userController.updateUser
    )

router.route('/:userId/activate')
    .get(
        authMiddleware.checkConfToken,
        userController.activateAccount
    )

module.exports = router;
