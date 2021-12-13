const File = require('../controllers/file.controller');
const Interceptor = require('../middlewares/auth.interceptor');

module.exports = (app) => {
    app.route('/upload/:issue/:d')
    .post( [ Interceptor.verifyUser ], File.uploadFiles);
};