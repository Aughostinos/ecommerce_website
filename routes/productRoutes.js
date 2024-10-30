import { Router } from "express";

import { 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductByCategory,
    searchProduct,
    getProductReviews,
    addProductReview
} from '../controllers/productController.js';


const productRouter = Router();

//this should list all products
productRouter.get('/', getProducts);

//this should list all products by category
productRouter.get('/get-products-by-category/:category', getProductByCategory);

//this should add a product
productRouter.post('/add-product', addProduct);

//this should update a product
productRouter.put('/update-product/:id', updateProduct);

//this should delete a product
productRouter.delete('/delete-product/:id', deleteProduct);

//this should get a single product
productRouter.get('/get-product/:id', getProduct);

//this should search for a product
productRouter.get('/search-product', searchProduct);

//this should get product reviews
productRouter.get('/:id/reviews', getProductReviews);

//this should add a product review
productRouter.post('/:id/reviews', addProductReview);
export default productRouter;
