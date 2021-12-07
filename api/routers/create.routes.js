const Create = require('../controllers/create.controller');

module.exports = (app) => {
    app.route('/d0')
    .post( Create.D0 );
}