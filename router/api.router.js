const router = require('express').Router();
const productRouter = require('./product.router');
const userRouter = require('./users.router');

router.use('/users', userRouter);
router.use('/products', productRouter);
// router.use('/users');

module.exports = router;
