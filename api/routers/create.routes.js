const Create = require('../controllers/create.controller');
const Interceptor = require('../middlewares/auth.interceptor');

module.exports = (app) => {
    app.route('/d0')
    .post( [Interceptor.verifyUser ], Create.D0 );

    app.route('/d1/:id')
    .post( Create.D1 );

    app.route('/d2/:id')
    .post( Create.D2 );

    app.route('/d3/:id')
    .post( Create.D3 );

    app.route('/d4/:id')
    .post( Create.D4 );

    app.route('/d5/:id')
    .post( Create.D5 );
}