const {Product} = require('../models')

module.exports = {
    getAllProducts: () => Product.find(),

    addProduct: (product) => Product.create(product)
}
