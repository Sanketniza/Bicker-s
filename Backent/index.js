const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const app = express();

const userRoutes = require('./routes/user.route');
const companyRoutes = require('./routes/company.route');
const productRoutes = require('./routes/product.route');
const orderRoutes = require('./routes/order.route');
const paymentRoutes = require('./routes/payment.route');
const notificationRoutes = require('./routes/notification.route');
const cart = require('./routes/cart.route')
const reviewRoutes = require('./routes/review.route');
const wishlistRoutes = require('./routes/wishlist.route');
const ratingRoutes = require('./routes/rating.route');
const likeRoutes = require('./routes/like.route');

dotenv.config(); // Load environment variables

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions)); // Enable CORS with options

const PORT = process.env.PORT || 3000;

//* Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/cart', cart)
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/rating', ratingRoutes);
app.use('/api/v1/like', likeRoutes);


//* database connection
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})

// Add this to your main server file to test your Cloudinary connection
const cloudinary = require("./utils/cloudinary");

// Test Cloudinary connection on startup
// async function testCloudinaryConnection() {
//   try {
//     const result = await cloudinary.uploader.upload(
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
//       { folder: "test" }
//     );
//     console.log("✅ Cloudinary connection successful:", result.secure_url);
//     return true;
//   } catch (error) {
//     console.error("❌ Cloudinary connection failed:", error);
//     return false;
//   }
// }

// testCloudinaryConnection();