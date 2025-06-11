# 🏍️ Bicker's - Motorcycle E-Commerce Platform

<div align="center">
  <img src="screenshots/logo.png" alt="Bicker's Logo" width="200"/>
  <br/>
  <h3>Premium motorcycle marketplace for enthusiasts and shop owners</h3>
</div>

<div align="center">

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [User Roles](#-user-roles)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

Bicker's is a comprehensive e-commerce platform specialized for motorcycle enthusiasts. The platform connects users with shop owners, allowing them to browse, purchase, and review motorcycles across different categories including road bikes, electric bikes, and scooters.

The application features a dual-user system (regular users and shop owners), responsive UI, secure authentication, and comprehensive motorcycle management for shop owners.

## ✨ Features

### 🧑‍💼 For Users
- **User Authentication**: Secure login/signup with email verification
- **Browse Motorcycles**: Filter by category, brand, price range
- **Detailed Product Views**: Specifications, images, videos, ratings
- **Shopping Cart & Wishlist**: Add items, manage quantities
- **Order Management**: Track orders, view history
- **Review System**: Rate and review purchased products
- **Profile Management**: Update personal details, view activity
- **Account Deletion**: Option to permanently delete account

### 🏪 For Shop Owners
- **Shop Management**: Create and manage motorcycle shop listings
- **Product Catalog**: Add, update, delete motorcycle listings
- **Order Processing**: Manage incoming orders, update status
- **Customer Engagement**: Respond to reviews and questions
- **Analytics Dashboard**: Sales reports and inventory tracking
- **Profile Management**: Business details, payment information
- **Account Management**: Update shop details or delete account

### 🛠️ Technical Features
- Responsive UI for all device sizes
- Real-time notifications
- Secure JWT authentication
- MongoDB data persistence
- Cloudinary media storage
- RESTful API architecture
- Form validation
- Error handling
- Toast notifications

## 📸 Screenshots

<!-- Add your screenshots here. I've provided placeholders where you can add your images manually. -->

<div align="center">
  <details>
    <summary>📱 Home Page</summary>
    <img src="screenshots/1.png" alt="Home Page" width="800"/>
  </details>
  
  <details>
    <summary>🏍️ Product Listings</summary>
    <img src="screenshots/product-listings.png" alt="Product Listings" width="800"/>
  </details>
  
  <details>
    <summary>🛒 Shopping Cart</summary>
    <img src="screenshots/shopping-cart.png" alt="Shopping Cart" width="800"/>
  </details>
  
  <details>
    <summary>👤 User Profile</summary>
    <img src="screenshots/user-profile.png" alt="User Profile" width="800"/>
  </details>
  
  <details>
    <summary>👨‍💼 Admin Dashboard</summary>
    <img src="screenshots/admin-dashboard.png" alt="Admin Dashboard" width="800"/>
  </details>
</div>

## 🔧 Tech Stack

### Frontend
- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Shadcn UI**: Component library
- **Axios**: API requests
- **Vite**: Build tool
- **Sonner**: Toast notifications

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM library
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Multer**: File uploads
- **Cloudinary**: Media storage
- **Nodemailer**: Email services

## 📂 Directory Structure

The project follows a clean, modular architecture:

```
Bicker's/
├── Frontend/                # React frontend application
│   ├── public/              # Static files
│   └── src/
│       ├── assets/          # Images, icons, etc.
│       ├── components/      # UI components
│       │   ├── admin/       # Admin-specific components
│       │   ├── shared/      # Shared components (Navbar, Footer)
│       │   ├── ui/          # UI elements (buttons, inputs)
│       │   └── user/        # User-specific components
│       ├── store/           # Redux store and slices
│       ├── hooks/           # Custom React hooks
│       ├── utils/           # Utility functions
│       └── App.jsx          # Main application component
│
├── Backent/                 # Express backend API
│   ├── controllers/         # Request handlers
│   ├── Middlewares/         # Custom middlewares
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── index.js             # Entry point
```

## 🔌 Installation & Setup

### Prerequisites

- Node.js (v14+)
- MongoDB
- Cloudinary account (for image uploads)

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup

1. Create a `.env` file in the `Backent` directory:

```
PORT=8000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

2. Start the server:

```bash
cd Backent
npm install
npm run dev
```

## 📡 API Endpoints

### User Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user
- `POST /api/v1/user/forgot-password` - Request password reset
- `POST /api/v1/user/reset-password` - Reset password

### User Management
- `POST /api/v1/user/profile/update` - Update user profile
- `DELETE /api/v1/user/delete-user/:userId` - Delete user account

### Product Management
- `GET /api/v1/product` - Get all products
- `GET /api/v1/product/:id` - Get product by ID
- `POST /api/v1/product` - Create new product (shop owners only)
- `PUT /api/v1/product/:id` - Update product (shop owners only)
- `DELETE /api/v1/product/:id` - Delete product (shop owners only)

### Order Management
- `GET /api/v1/order` - Get user orders
- `POST /api/v1/order` - Create new order
- `PUT /api/v1/order/:id` - Update order status (shop owners only)

### Reviews & Ratings
- `POST /api/v1/rating` - Add product rating
- `POST /api/v1/review` - Add product review
- `GET /api/v1/review/product/:productId` - Get product reviews

### Wishlist & Cart
- `GET /api/v1/wishlist` - Get user wishlist
- `POST /api/v1/wishlist` - Add product to wishlist
- `DELETE /api/v1/wishlist/:id` - Remove from wishlist
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart` - Add to cart
- `DELETE /api/v1/cart/:id` - Remove from cart

## 👥 User Roles

### Regular User
Regular users can browse products, add items to cart, place orders, and leave reviews.

### Shop Owner
Shop owners can manage their product listings, process orders, respond to customer reviews, and track sales.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Developed with ❤️ by the Bicker's Team</p>
</div>
