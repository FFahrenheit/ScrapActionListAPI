const Create = require('../controllers/create.controller');
const Interceptor = require('../middlewares/auth.interceptor');

module.exports = (app) => {
    app.route('/d0')
    .post( [Interceptor.verifyUser ], Create.D0 );

    app.route('/d1/:id')
    .post(Create.D1 );
}