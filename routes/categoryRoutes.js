import { Router } from "express";
import { 
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    searchCategory,
} from '../controllers/categoryController.js';

const categoryRouter = Router();

//this should list all categories
categoryRouter.get('/get-categories', getCategories);

//this should add a category
categoryRouter.post('/add-category', addCategory);

//this should update a category
categoryRouter.put('/update-category/:id', updateCategory);

//this should delete a category
categoryRouter.delete('/delete-category/:id', deleteCategory);

//this should get a single category
categoryRouter.get('/get-category/:id', getCategory);

//this should search for a category
categoryRouter.get('/search-category', searchCategory);

export default categoryRouter;