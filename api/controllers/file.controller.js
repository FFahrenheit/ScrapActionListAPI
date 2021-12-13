const Sql = require('../db/sql');
const Upload = require('../middlewares/upload.files');

exports.uploadFiles = async (req, res) => {
    try {
        await Upload.addFiles(req, res);
        const { issue, d } = req.params;
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