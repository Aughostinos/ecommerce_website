import { Router } from "express";

import { 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    searchProduct
} from '../controllers/productController.js';


const productRouter = Router();

//this should list all products
productRouter.get('/get-products', getProducts);

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

export default productRouter;
