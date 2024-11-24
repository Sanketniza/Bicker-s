const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    }
});

const singleUpload = upload.single('file');
const uploadMiddleware = upload.single('logo');

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
    uploadMiddleware: handleUpload(uploadMiddleware)
};