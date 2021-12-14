const Sql = require('../db/sql');
const Upload = require('../middlewares/upload.files');
const Identificator = require('../middlewares/auth.interceptor');
const path = require('path');

exports.getFiles = async (req, res) => {
    try {
        const { issue, filename } = req.params;
        let directory = `upload/Issues/${ issue }/${ filename }`;
        directory = path.resolve(directory);
        console.log({ directory });

        res.sendFile(directory, err=>{
            if(err){
                console.log(err);
                res.json({
                    ok: false,
                    error: err
                });
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
};

exports.uploadFiles = async (req, res) => {
    try {
        await Upload.addFiles(req, res);
        const { issue, d } = req.params;
        const author = Identificator.getUser(req);
        let description = req.body?.description || 'Resource file';
        description = d + ' ' + description;

        let files = [];
        console.log('-------------------- DATA --------------------');
        console.log({ issue, d });
        console.log('-------------------- FILES --------------------');
        console.log(req.files);

        if (req.files.length <= 0) {
            return res.json({
                ok: false,
                message: 'You must select at least 1 file'
            });
        }

        req.files.forEach(f => {
            files.push({
                description: description,
                filename: f.filename,
                issue: issue,
                author: author
            });
        });

        console.log(files);

        let query = "INSERT INTO evidence() VALUES ?";
        await Sql.query(query, files);

        return res.json({
            ok: true,
            message: 'Files has been uploaded.'
        });

    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
};