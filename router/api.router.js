const router = require('express').Router();
const authRouter = require('./auth.router');
const productRouter = require('./product.router');
const userRouter = require('./users.router');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;
