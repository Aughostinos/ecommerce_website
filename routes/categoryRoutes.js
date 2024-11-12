import { Router } from "express";
import {
    getCategories,
    getCategory
} from '../controllers/categoryController.js';

const categoryRouter = Router();

//this should list all categories
categoryRouter.get('/get-categories', getCategories);

//this should get a single category
categoryRouter.get('/get-category/:id', getCategory);


export default categoryRouter;