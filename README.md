# E-Commerce Backend

Welcome to the **E-Commerce Backend** repository! This is the server-side application of our e-commerce platform, built using **Node.js**, **Express.js**, and **MongoDB**. It handles all business logic, data storage, and API endpoints to support the frontend application.

## Table of Contents

- [E-Commerce Backend](#e-commerce-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [Authentication Routes](#authentication-routes)
    - [User Routes](#user-routes)
    - [Order Routes](#order-routes)
    - [Product Routes](#product-routes)
  - [Available Scripts](#available-scripts)
    - [`npm run dev` or `yarn dev`](#npm-run-dev-or-yarn-dev)
    - [`npm start` or `yarn start`](#npm-start-or-yarn-start)
    - [`npm test` or `yarn test`](#npm-test-or-yarn-test)
    - [`npm run lint` or `yarn lint`](#npm-run-lint-or-yarn-lint)
  - [Project Structure](#project-structure-1)
  - [Contributing](#contributing)
  - [Contact](#contact)

## Features

- **User Management**
  - User registration and authentication using JWT.
  - Profile management (view and update).
  - Wishlist and cart management.
- **Product Management**
  - CRUD operations for products.
  - Manage product categories.
  - Handle product stock levels.
- **Order Management**
  - Create and manage orders.
  - Track order status (e.g., Pending, Paid, Shipped).
  - Order history for users.
- **Security**
  - Protect routes using authentication middleware.
  - Input validation and error handling.
- **Scalability**
  - Structured with modular routes and controllers.
  - Ready for integration with frontend applications.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication.
- **bcrypt**: For hashing user passwords.
- **dotenv**: For managing environment variables.
- **Cors**: To handle Cross-Origin Resource Sharing.
- **Nodemon**: For automatic server restarts during development.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Installed on your machine. You can download it [here](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.
- **MongoDB**: Installed and running on your machine or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/e-commerce-backend.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd e-commerce-backend
   ```

3. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:3000
   ```

   **Descriptions:**

   - `PORT`: Port number for the server to listen on.
   - `MONGO_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT signing and verification.
   - `CLIENT_URL`: URL of the frontend application for CORS configuration.

2. **Database Setup**

   - Ensure MongoDB is installed and running.
   - If using MongoDB Atlas, replace the `MONGO_URI` with your cluster's connection string.

## Running the Application

### Development Mode

Start the server with hot-reloading using Nodemon.

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

### Production Mode

Start the server without hot-reloading.

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The server will run on [http://localhost:5000](http://localhost:5000) by default.

## Project Structure

```plaintext
e-commerce-backend/
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── utils/
│   └── generateToken.js
├── config/
│   └── db.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## API Documentation

### Authentication Routes

**Note:** These routes handle user registration and authentication.

- **POST `/auth/signup`**
  - **Description:** Register a new user.
  - **Body Parameters:**
    - `name` (string, required): User's name.
    - `email` (string, required): User's email.
    - `password` (string, required): User's password.
  - **Responses:**
    - `201 Created`: User successfully registered.
    - `400 Bad Request`: Validation errors or email already in use.

- **POST `/auth/login`**
  - **Description:** Authenticate user and return a JWT.
  - **Body Parameters:**
    - `email` (string, required): User's email.
    - `password` (string, required): User's password.
  - **Responses:**
    - `200 OK`: Successfully authenticated with JWT.
    - `400 Bad Request`: Missing or incorrect credentials.

### User Routes

**Note:** These routes handle user profile, wishlist, and cart management. All routes are protected and require authentication.

- **GET `/user/profile`**
  - **Description:** Retrieve the authenticated user's profile.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Responses:**
    - `200 OK`: User profile data.
    - `401 Unauthorized`: Invalid or missing token.

- **PUT `/user/update-profile`**
  - **Description:** Update the authenticated user's profile.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:** Any user fields to update (e.g., `name`, `email`, `password`).
  - **Responses:**
    - `200 OK`: Profile updated successfully.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **POST `/user/add-to-wishlist`**
  - **Description:** Add a product to the user's wishlist.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:**
    - `productId` (string, required): ID of the product to add.
  - **Responses:**
    - `200 OK`: Product added to wishlist.
    - `400 Bad Request`: Validation errors or product already in wishlist.
    - `401 Unauthorized`: Invalid or missing token.

- **POST `/user/remove-from-wishlist`**
  - **Description:** Remove a product from the user's wishlist.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:**
    - `productId` (string, required): ID of the product to remove.
  - **Responses:**
    - `200 OK`: Product removed from wishlist.
    - `400 Bad Request`: Validation errors or product not in wishlist.
    - `401 Unauthorized`: Invalid or missing token.

- **POST `/user/add-to-cart`**
  - **Description:** Add a product to the user's cart.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:**
    - `productId` (string, required): ID of the product to add.
    - `quantity` (number, optional): Quantity to add (defaults to 1).
  - **Responses:**
    - `200 OK`: Product added to cart.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **DELETE `/user/remove-from-cart`**
  - **Description:** Remove a product from the user's cart.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:**
    - `productId` (string, required): ID of the product to remove.
  - **Responses:**
    - `200 OK`: Product removed from cart.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **PUT `/user/update-cart-item`**
  - **Description:** Update the quantity of a product in the user's cart.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:**
    - `productId` (string, required): ID of the product.
    - `quantity` (number, required): New quantity.
  - **Responses:**
    - `200 OK`: Cart updated successfully.
    - `400 Bad Request`: Validation errors.
    - `401 Unauthorized`: Invalid or missing token.

- **GET `/user/get-cart-wishlist`**
  - **Description:** Retrieve the user's cart and wishlist.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Responses:**
    - `200 OK`: Cart and wishlist data.
    - `401 Unauthorized`: Invalid or missing token.

### Order Routes

**Note:** These routes handle order creation and management. Some routes are protected and require authentication, while others may require admin privileges.

- **GET `/orders`**
  - **Description:** Retrieve all orders (Admin only).
  - **Headers:**
    - `Authorization`: `Bearer <Admin JWT Token>`
  - **Responses:**
    - `200 OK`: List of all orders.
    - `401 Unauthorized`: Invalid or missing token.
    - `403 Forbidden`: User is not an admin.

- **POST `/orders`**
  - **Description:** Create a new order.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Body Parameters:**
    - `orderItems` (array, required): Array of order items.
    - `shippingAddress` (object, required): Shipping address details.
    - `paymentMethod` (string, required): Payment method selected.
  - **Responses:**
    - `201 Created`: Order placed successfully.
    - `400 Bad Request`: Validation errors or insufficient stock.
    - `401 Unauthorized`: Invalid or missing token.

- **GET `/orders/:id`**
  - **Description:** Retrieve order details by ID.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Parameters:**
    - `id` (string, required): Order ID.
  - **Responses:**
    - `200 OK`: Order details.
    - `404 Not Found`: Order not found or does not belong to the user.
    - `401 Unauthorized`: Invalid or missing token.

- **PUT `/orders/:id/pay`**
  - **Description:** Mark an order as paid.
  - **Headers:**
    - `Authorization`: `Bearer <JWT Token>`
  - **Parameters:**
    - `id` (string, required): Order ID.
  - **Responses:**
    - `200 OK`: Order marked as paid.
    - `404 Not Found`: Order not found.
    - `401 Unauthorized`: Invalid or missing token.

- **DELETE `/orders/:id`**
  - **Description:** Delete an order (Admin only).
  - **Headers:**
    - `Authorization`: `Bearer <Admin JWT Token>`
  - **Parameters:**
    - `id` (string, required): Order ID.
  - **Responses:**
    - `200 OK`: Order deleted successfully.
    - `404 Not Found`: Order not found.
    - `401 Unauthorized`: Invalid or missing token.
    - `403 Forbidden`: User is not an admin.

- **GET `/orders/user/:userId`**
  - **Description:** Retrieve all orders for a specific user (Admin only).
  - **Headers:**
    - `Authorization`: `Bearer <Admin JWT Token>`
  - **Parameters:**
    - `userId` (string, required): User ID.
  - **Responses:**
    - `200 OK`: List of orders for the user.
    - `404 Not Found`: User not found.
    - `401 Unauthorized`: Invalid or missing token.
    - `403 Forbidden`: User is not an admin.

### Product Routes

**Note:** These routes handle product retrieval. Additional CRUD routes may exist for admin functionalities.

- **GET `/products/get-products-by-category/:categoryId`**
  - **Description:** Retrieve all products under a specific category.
  - **Parameters:**
    - `categoryId` (string, required): Category ID.
  - **Responses:**
    - `200 OK`: List of products.
    - `404 Not Found`: Category not found.
    - `400 Bad Request`: Invalid category ID.

- **CRUD Operations for Products (Admin Only)**
  - **POST `/products`**
    - **Description:** Create a new product.
    - **Headers:**
      - `Authorization`: `Bearer <Admin JWT Token>`
    - **Body Parameters:** Product details (e.g., `name`, `price`, `description`, `category`, `stock`, `image`).
    - **Responses:**
      - `201 Created`: Product created successfully.
      - `400 Bad Request`: Validation errors.
      - `401 Unauthorized`: Invalid or missing token.
      - `403 Forbidden`: User is not an admin.

  - **PUT `/products/:id`**
    - **Description:** Update an existing product.
    - **Headers:**
      - `Authorization`: `Bearer <Admin JWT Token>`
    - **Parameters:**
      - `id` (string, required): Product ID.
    - **Body Parameters:** Fields to update.
    - **Responses:**
      - `200 OK`: Product updated successfully.
      - `400 Bad Request`: Validation errors.
      - `401 Unauthorized`: Invalid or missing token.
      - `403 Forbidden`: User is not an admin.
      - `404 Not Found`: Product not found.

  - **DELETE `/products/:id`**
    - **Description:** Delete a product.
    - **Headers:**
      - `Authorization`: `Bearer <Admin JWT Token>`
    - **Parameters:**
      - `id` (string, required): Product ID.
    - **Responses:**
      - `200 OK`: Product deleted successfully.
      - `401 Unauthorized`: Invalid or missing token.
      - `403 Forbidden`: User is not an admin.
      - `404 Not Found`: Product not found.

  - **GET `/products/:id`**
    - **Description:** Retrieve product details by ID.
    - **Parameters:**
      - `id` (string, required): Product ID.
    - **Responses:**
      - `200 OK`: Product details.
      - `404 Not Found`: Product not found.
      - `400 Bad Request`: Invalid product ID.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Runs the app in development mode with hot-reloading using **Nodemon**.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm start` or `yarn start`

Runs the app in production mode.<br>
The server will start without hot-reloading.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br>
> **Note:** Ensure you have tests written and configured.

### `npm run lint` or `yarn lint`

Runs ESLint to analyze code for potential errors and enforce coding standards.

## Project Structure

```plaintext
e-commerce-backend/
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── utils/
│   └── generateToken.js
├── config/
│   └── db.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**

2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**


## Contact

Augustinos Abusaif -  augustinos.nabil@gmail.com

Project Link: \[https://github.com/Aughostinos/Ecommerce_website_Front_End\](https://github.com/Aughostinos/ecommerce_website)
