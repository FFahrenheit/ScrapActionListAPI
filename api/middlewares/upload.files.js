const multer = require('multer'),
    fs = require('fs'),
    util = require('util'),
    path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const { issue, d} = req.params;
        console.log({issue, d});

        const folder = `Issues/${ issue }/${d}`;
        const path = `${__dirname}/../../upload/${folder}`;
        
        fs.mkdirSync(path, { recursive: true });
        console.log(path);

        callback(null, path);
    },
    filename: async(req, file, callback) => {
        const { issue, d} = req.params;

        const filename = `Issue-${issue}_${d}_${Number(new Date())}_${file.originalname}`;
        console.log(filename);
        callback(null, filename);
    }
});

const uploadFiles = multer({ storage: storage }).array('multi-files', 10);
const addFiles = util.promisify(uploadFiles);

module.exports = {
    addFiles
};