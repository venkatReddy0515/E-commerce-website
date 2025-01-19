# E-Commerce Website

This repository contains the backend for an E-commerce website built using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides essential features for user authentication, product management, cart operations, and order processing. The admin panel allows managing products and orders.

---

## Features

### User Features
- **Login and Signup**: User authentication system with password encryption.
- **Password Reset**: Securely reset passwords.
- **Add to Cart**: Users can add items to their cart.
- **Place Orders**: Users can proceed to checkout and place orders with Cash on Delivery (COD).

### Admin Features
- **Product Management**: Add, update, and delete products.
- **Order Management**: Update order statuses (e.g., Processing, Shipped, Delivered).

### Additional Features
- **Secure API**: Protect routes and handle sensitive data securely.
- **Modular Routes**: Organized routes for users, products, cart, and orders.
- **Cross-Origin Resource Sharing (CORS)**: Enables secure cross-origin requests.

---

## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building APIs and handling requests.
- **MongoDB**: Database to store user, product, cart, and order information.
- **Mongoose**: ODM for MongoDB to model data.
- **dotenv**: For managing environment variables.
- **bcrypt**: For password hashing.

### Frontend:
- **React.js**: Library for building the user interface (not included in this repository).

---

## Prerequisites

- **Node.js** (version >= 14.0)
- **MongoDB** (local or cloud-based instance)
- **npm** (Node Package Manager)

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/venkatReddy0515/E-commerce-website.git
   cd E-commerce-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   Add the following environment variables:
   ```env
   MONGO_URL=mongodb://localhost:27017/EcommerceDB
   PORT=5000
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

5. **API Endpoints:**
   - User Routes: `/api`
   - Product Routes: `/api/product`
   - Cart Routes: `/api/cart`
   - Order Routes: `/api/place-order`

6. **Default route:**
   Access the base URL to confirm the server is running:
   ```
   http://localhost:5000/
   ```
   Response: `"api is building."`

---

## Project Structure

```plaintext
E-commerce-website/
├── Routes/
│   ├── UserRoute.js
│   ├── ProductRoute.js
│   ├── CartRoutes.js
│   └── OrderRouter.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## Future Enhancements
- Integrate payment gateway options (e.g., PayPal, Stripe).
- Add real-time notifications for order updates.
- Implement advanced product search and filtering.
- Enhance admin panel with analytics and reports.

---

## Contribution

Contributions are welcome! If you find any issues or have feature suggestions, please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.

