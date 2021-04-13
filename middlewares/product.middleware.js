// const { Product } = require('../models')
//
// module.exports = {
//     isProductFormValid: async (req,res,next) => {
//         try {
//             const { name } = req.body;
//
//             const prod = await Product.findOne({name});
//             if (prod) {
//                 throw new Error('THIS EXIST')
//             }
//
//         } catch (err) {
//             console.log(err)
//         }
//     }
//
// }
