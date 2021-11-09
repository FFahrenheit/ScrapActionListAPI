const Auth = require('../controllers/auth.controller');

module.exports = (app) => {
    app.route('/auth')
        .get([

        ], Auth.loginWithSSO);
}