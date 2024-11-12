import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product by category
export const getProductByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get featured products
export const getFeaturedProducts = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        const featuredProducts = [];

        for (const categoryId of categories) {
            const products = await Product.find({ category: categoryId })
                .limit(5)
                .sort({ createdAt: -1 });
            featuredProducts.push(...products);
        }

        res.status(200).json(featuredProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get single product
export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// search product
export const searchProducts = async (req, res) => {
    try {
        const query = req.query.query || '';
        const products = await Product.find({
            name: { $regex: query, $options: 'i' },
        }).populate('category');

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// get product stock
export const getProductStock = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.stock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/* for future implementation */
// add product rating
export const addProductRating = async (req, res) => {
    const { productId } = req.params;
    const { userId, rating } = req.body;
    try {
        const product = await Product.findById(productId);
        product.ratings.push({ userId, rating });
        await product.save();
        res.status(200).json({ message: 'Rating added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// add product review
export const addProductReview = async (req, res) => {
    const { productId } = req.params;
    const { userId, rating, comment } = req.body;
    try {
        const product = await Product.findById(productId);
        product.reviews.push({ userId, rating, comment });
        await product.save();
        res.status(200).json({ message: 'Review added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product ratings
export const getProductRatings = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.ratings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product rating
export const getProductRating = async (req, res) => {
    const { productId, ratingId } = req.params;
    try {
        const product = await Product.findById(productId);
        const rating = product.ratings.id(ratingId);
        res.status(200).json(rating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product reviews
export const getProductReviews = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product.reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// get product review
export const getProductReview = async (req, res) => {
    const { productId, reviewId } = req.params;
    try {
        const product = await Product.findById(productId);
        const review = product.reviews.id(reviewId);
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

