const multer = require('multer'),
    fs = require('fs'),
    util = require('util'),
    path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const issue = req.params.issue;

        const folder = `Issues/${ issue }`;
        const path = `${__dirname}/../../upload/${folder}`;
        
        fs.mkdirSync(path, { recursive: true });
        console.log(path);

        callback(null, path);
    },
    filename: async(req, file, callback) => {
        const { issue, d} = req.params;
        const id = String(Number(new Date())).slice(-5);
        const filename = `Issue-${ issue }_${ d }_${ id }_${ file.originalname }`;
        console.log(filename);
        callback(null, filename);
    }
});

const uploadFiles = multer({ storage: storage }).array('multi-files', 10);
const addFiles = util.promisify(uploadFiles);

module.exports = {
    addFiles
};