const router = require('express').Router();
const { productController } = require('../controllers')
router.get('/', productController.showAllProducts)
// router.get('/:productId', productController.addNewProduct)

router.post('/', productController.addNewProduct)
router.delete('/:productId', productController.addNewProduct)


module.exports = router;
