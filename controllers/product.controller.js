const { productService } = require('../service')

module.exports = {
    addNewProduct: async (req,res) => {
        try {
            const product = req.body;
            console.log(product)
            await productService.addProduct(product)
        } catch (err) {
            console.log(err)
        }
    },

    showAllProducts: async (req,res) => {
        try {
            const products = await productService.getAllProducts();

            res.json(products)

        } catch (err) {
            console.log(err)
        }
    }
}
