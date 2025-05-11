// const { v2: cloudinary } = require("cloudinary");
// require('dotenv').config(); 

// cloudinary.config({

//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,

// });

// module.exports = cloudinary;

const { v2: cloudinary } = require("cloudinary");
require('dotenv').config(); // Make sure dotenv is imported

// Log the Cloudinary configuration (don't log secret in production)
console.log("Cloudinary Configuration:", {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "Secret exists" : "Secret missing", 
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;