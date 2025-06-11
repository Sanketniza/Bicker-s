// const multer = require('multer');

// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type! Please upload only images or videos.'), false);
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 10 * 1024 * 1024 // 10MB limit
//     }
// });

// // For product uploads (multiple files)
// const productUpload = upload.fields([
//     { name: 'images', maxCount: 5 },
//     { name: 'videos', maxCount: 2 }
// ]);

// // For single file uploads
// const singleUpload = upload.single('file');
// const logoUpload = upload.single('logo');

// // Wrapper function to handle multer errors
// const handleUpload = (uploadType) => {
//     return (req, res, next) => {
//         uploadType(req, res, (err) => {
//             if (err instanceof multer.MulterError) {
//                 return res.status(400).json({
//                     message: "File upload error",
//                     error: err.message,
//                     success: false
//                 });
//             } else if (err) {
//                 return res.status(400).json({
//                     message: err.message || "Unknown error occurred",
//                     success: false
//                 });
//             }
//             next();
//         });
//     };
// };

// module.exports = {
//     singleUpload: handleUpload(singleUpload),
//     uploadMiddleware: handleUpload(logoUpload),
//     productUpload: handleUpload(productUpload)
// };

const multer = require("multer");
const path = require("path");

// Set up memory storage for file uploads
const storage = multer.memoryStorage();

// File type filter
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    ];
    
    const allowedVideoTypes = [
        "video/mp4",
        "video/webm",
        "video/quicktime"
    ];
    
    if (file.fieldname === 'logo' || file.fieldname === 'images') {
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported image format! Please upload jpeg, png, gif or webp."), false);
        }
    } else if (file.fieldname === 'videos') {
        if (allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported video format! Please upload mp4, webm or quicktime."), false);
        }
    } else {
        cb(null, true);
    }
};

// Product upload middleware
const productUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for videos
    }
}).fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 }
]);

// Company logo upload middleware
const uploadMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported image format! Please upload jpeg, png, gif or webp."), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    }
}).single("logo");

module.exports = { uploadMiddleware, productUpload };