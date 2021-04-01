const router = require('express').Router();
const {userController} = require('../controllers')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)


router.post('/:userId', )


module.exports = router;
