const router = require('express').Router();

const {authController, userController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

router.post('/', authMiddleware.checkUser('restore'), authController.enterToAccount);
router.post('/forgotPass', userMiddleware.checkUsersPass, userController.changePass);
router.get('/forgotPass', authMiddleware.checkConfToken, userController.addNewPass);
router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.takeRefresh);


module.exports = router;


