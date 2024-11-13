import Category from "../models/Category.js";

// get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get category by id
export const getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

