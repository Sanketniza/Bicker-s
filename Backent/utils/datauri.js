// const DatauriParser = require('datauri/parser');
// const path = require('path');

// const getDataUri = (file) => {
//     if (!file) return null;

//     const parser = new DatauriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// };

// module.exports = getDataUri;

const DatauriParser = require('datauri/parser');
const path = require('path');

const getDataUri = (file) => {
    try {
        if (!file) {
            console.error("No file provided to getDataUri");
            return null;
        }
        
        if (!file.buffer) {
            console.error(`File ${file.originalname} has no buffer. Make sure multer is configured with memoryStorage()`);
            return null;
        }
        
        // Log file details for debugging
        // console.log(`Processing file in getDataUri: ${file.originalname}, size: ${file.buffer.length} bytes`);

        const parser = new DatauriParser();
        const extName = path.extname(file.originalname).toString();
        const result = parser.format(extName, file.buffer);
        
        if (!result || !result.content) {
            console.error(`DataURI conversion failed for ${file.originalname}`);
            return null;
        }
        
        // console.log(`DataURI created successfully for ${file.originalname}`);
        return result;
    } catch (error) {
        console.error(`Error in getDataUri for ${file?.originalname || 'unknown file'}:`, error);
        return null;
    }
};

module.exports = getDataUri;