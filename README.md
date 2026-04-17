# ShoppyGlobe Express API

A simple Express.js backend for a shopping application with user authentication, product listing, and cart management.

## Features

- User registration and login using JWT authentication
- Product listing and product detail retrieval
- Cart operations for authenticated users:
  - Add product to cart
  - Update cart item quantity
  - Remove cart item

## Project Structure

- `server.js` — main Express server setup
- `config/db.js` — MongoDB connection logic
- `middleware/authMiddleware.js` — JWT authentication middleware
- `models/Users.js` — user schema
- `models/Products.js` — product schema
- `models/Cart.js` — cart schema
- `routes/authRoutes.js` — registration and login routes
- `routes/productRoutes.js` — product endpoints
- `routes/cartRoutes.js` — cart endpoints

## Prerequisites

- Node.js 18+ or compatible
- MongoDB running locally or remotely

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with the following values:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
   JWT_SECRET=shoppyglobeSecretKey
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Visit the root endpoint to verify the API:
   ```text
   http://localhost:3000/
   ```

## API Endpoints

### Authentication

- `POST /register`
  - Body: `{ "name": "...", "email": "...", "password": "..." }`
  - Registers a new user

- `POST /login`
  - Body: `{ "email": "...", "password": "..." }`
  - Returns a JWT token

### Products

- `GET /products`
  - Returns all products

- `GET /products/:id`
  - Returns a product by ID

### Cart

All cart endpoints require an `Authorization` header with a bearer token:

```text
Authorization: Bearer <token>
```

- `POST /cart`
  - Body: `{ "productId": "...", "quantity": 1 }`
  - Adds a product to the user's cart

- `PUT /cart/:id`
  - Body: `{ "quantity": 2 }`
  - Updates the cart item quantity

- `DELETE /cart/:id`
  - Removes the cart item

## Notes

- Make sure your MongoDB data exists in the correct database and collection names.
- The product collection should be `products` when using the `Product` model.
- Use Thunder Client or another REST client to test the endpoints.
