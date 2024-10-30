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

// add category
export const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        res.status(200).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get category
export const getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// search category
export const searchCategory = async (req, res) => {
    const { name } = req.query;
    try {
        const categories = await Category.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete category
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
