import { Router } from "express";

import { 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProduct
} from '../controllers/productController.js';


const router = Router();

//this should list all products
router.get('/get-products', getProducts);

//this should add a product
router.post('/add-product', addProduct);

//this should update a product
router.put('/update-product/:id', updateProduct);

//this should delete a product
router.delete('/delete-product/:id', deleteProduct);

//this should get a single product
router.get('/get-product/:id', getProduct);

//this should search for a product
router.get('/search-product', searchProduct);

export default router;
