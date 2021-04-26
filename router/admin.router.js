const router = require('express').Router();

const { adminController, userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.route('/users')
    .get(
        authMiddleware.checkAccessToken,
        authMiddleware.checkRole(['admin']),
        userController.getAllUsers
    )

// router.route('/users/:id')
//     .get(
//         authMiddleware.checkUser,
//         authMiddleware.checkAccessToken,
//         authMiddleware.checkRole['admin'],
//         userController.getSingleUser
//     );

// router.put('/users/:id',
//     authMiddleware.checkAccessToken,
//     authMiddleware.checkRole['admin'],
//     adminController.changeRole
// );

// router.use('/:id', middleware.isPresent)
//
// router.delete('/:id', controller.delete);
//
// router.post('/', controller.create);

module.exports = router;
