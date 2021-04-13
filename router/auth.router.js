const router = require('express').Router();

const {authController, userController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

router.post('/',authMiddleware.checkUser('restore'), authController.enterToAccount);
router.post('/forgotPass', userController.changePass);
router.get('/forgotPass', authMiddleware.checkConfToken, userController.addNewPass);
router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.takeRefresh);


module.exports = router;


