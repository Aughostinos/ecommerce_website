import { Router } from "express";

import { 
    getProducts,
    getProduct,
    getProductByCategory,
    searchProduct,
    getProductReviews,
    getFeaturedProducts,
    addProductReview
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';


const productRouter = Router();

//this should list all products
productRouter.get('/', getProducts);

//this should list all products by category
productRouter.get('/get-products-by-category/:category', getProductByCategory);

//this should list all featured products
productRouter.get('/featured', getFeaturedProducts);

//this should get a single product
productRouter.get('/get-product/:id', getProduct);

//this should search for a product
productRouter.get('/search-product', searchProduct);

//this should get product reviews
productRouter.get('/:id/reviews', getProductReviews);

//this should add a product review
productRouter.post('/:id/reviews', addProductReview);
export default productRouter;
