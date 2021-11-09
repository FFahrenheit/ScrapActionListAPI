const Auth = require('../controllers/auth.controller'),
    DomainAuth = require('../middlewares/domain.auth');

module.exports = (app) => {
    app.route('/auth')
        .get([
            DomainAuth.verifyWindowsUser,
            DomainAuth.handleWindowsErrors
        ], Auth.loginWithSSO);
}