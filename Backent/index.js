const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const app = express();

const userRoutes = require('./routes/user.route');
const companyRoutes = require('./routes/company.route');


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


//* database connection
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})