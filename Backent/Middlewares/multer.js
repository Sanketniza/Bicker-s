const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type! Please upload only images or videos.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// For product uploads (multiple files)
const productUpload = upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 }
]);

// For single file uploads
const singleUpload = upload.single('file');
const logoUpload = upload.single('logo');

// Wrapper function to handle multer errors
const handleUpload = (uploadType) => {
    return (req, res, next) => {
        uploadType(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    message: "File upload error",
                    error: err.message,
                    success: false
                });
            } else if (err) {
                return res.status(400).json({
                    message: err.message || "Unknown error occurred",
                    success: false
                });
            }
            next();
        });
    };
};

module.exports = {
    singleUpload: handleUpload(singleUpload),
    uploadMiddleware: handleUpload(logoUpload),
    productUpload: handleUpload(productUpload)
};