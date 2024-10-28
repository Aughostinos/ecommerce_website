import { Router } from "express";

const homeRouter = Router();

homeRouter.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

export default homeRouter;