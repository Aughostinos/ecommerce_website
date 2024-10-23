import Product from '../models/Product.js';


export const getProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// add product
export const addProduct = async (req, res) => {
    const { name, description, price, category, stock, image } = req.body;
    try {
        const product = await Product.create({ name, description, price, category, stock, image });
        res.status(200).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock, image } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, stock, image }, { new: true });
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete product 
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
export const searchProduct = async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });
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
}

// get product orders
export const getProductOrders = async (req, res) => {
    const { productId } = req.params;
    try {
        const orders = await Order.find({ productId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product order
export const getProductOrder = async (req, res) => {
    const { productId, orderId } = req.params;
    try {
        const order = await Order.findOne({ productId, _id: orderId });
        res.status(200).json(order);
    }   catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get product reviews
export const getProductReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

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

// update product review
export const updateProductReview = async (req, res) => {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;
    try {
        const product = await Product.findById(productId);
        const review = product.reviews.id(reviewId);
        review.rating = rating;
        review.comment = comment;
        await product.save();
        res.status(200).json({ message: 'Review updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete product review
export const deleteProductReview = async (req, res) => {
    const { productId, reviewId } = req.params;
    try {
        const product = await Product.findById(productId);
        product.reviews.id(reviewId).remove();
        await product.save();
        res.status(200).json({ message: 'Review deleted successfully', product });
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

// add product rating
export const addProductRating = async (req, res) => {
    const { productId } = req.params;
    const { userId, rating } = req.body;
    try {
        const product = await Product.findById (productId);
        product.ratings.push({ userId, rating });
        await product.save();
        res.status(200).json({ message: 'Rating added successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product rating
export const updateProductRating = async (req, res) => {
    const { productId, ratingId } = req.params;
    const { rating } = req.body;
    try {
        const product = await Product.findById(productId);
        const rate = product.ratings.id(ratingId);
        rate.rating = rating;
        await product.save();
        res.status(200).json({ message: 'Rating updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete product rating
export const deleteProductRating = async (req, res) => {
    const { productId, ratingId } = req.params;
    try {
        const product = await Product.findById(productId);
        product.ratings.id(ratingId).remove();
        await product.save();
        res.status(200).json({ message: 'Rating deleted successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
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

// update product stock
export const updateProductStock = async (req, res) => {
    const { productId } = req.params;
    const { stock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { stock }, { new: true });
        res.status(200).json({ message: 'Stock updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product price
export const getProductPrice = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.price);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product price
export const updateProductPrice = async (req, res) => {
    const { productId } = req.params;
    const { price } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { price }, { new: true });
        res.status(200).json({ message: 'Price updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product description
export const getProductDescription = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.description);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product description
export const updateProductDescription = async (req, res) => {
    const { productId } = req.params;
    const { description } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { description }, { new: true });
        res.status(200).json({ message: 'Description updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product image
export const getProductImage = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product image
export const updateProductImage = async (req, res) => {
    const { productId } = req.params;
    const { image } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { image }, { new: true });
        res.status(200).json({ message: 'Image updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product category
export const getProductCategory = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product category
export const updateProductCategory = async (req, res) => {
    const { productId } = req.params;
    const { category } = req.body;
    try {
        const product = await Product.findByIdAndUpdate (productId, { category }, { new: true });
        res.status(200).json({ message: 'Category updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product name
export const getProductName = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product.name);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product name
export const updateProductName = async (req, res) => {
    const { productId } = req.params;
    const { name } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { name }, { new: true });
        res.status(200).json({ message: 'Name updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get product details
export const getProductDetails = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update product details
export const updateProductDetails = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, category, stock, image } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(productId, { name, description, price, category, stock, image }, { new: true });
        res.status(200).json({ message: 'Product details updated successfully', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
