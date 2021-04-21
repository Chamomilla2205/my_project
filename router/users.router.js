const router = require('express').Router();
const {userController} = require('../controllers')
const {userMiddleware, authMiddleware} = require('../middlewares')

router.route('/')
    .get(userController.getAllUsers)
    .post(
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
        authMiddleware.userCanDelete,
        userController.deleteUser
    )
    .post(
        authMiddleware.checkAccessToken,
        authMiddleware.checkUser('restore'),
        userController.restoreUser
    )
    .put(
        authMiddleware.checkAccessToken,
        authMiddleware.checkUser(),
        userController.updateUser
    )

router.route('/:userId/activate')
    .get(
        authMiddleware.checkConfToken,
        userController.activateAccount
    )

module.exports = router;
