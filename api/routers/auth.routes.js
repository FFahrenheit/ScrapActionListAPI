const Auth = require('../controllers/auth.controller'),
    DomainAuth = require('../middlewares/domain.auth');

module.exports = (app) => {
    app.route('/auth')
        .get([
            DomainAuth.useCors,
            DomainAuth.useSession,
            DomainAuth.verifyWindowsUser
        ], Auth.loginWithSSO)
        .post([
            DomainAuth.useCors,
            DomainAuth.useSession
        ], Auth.loginWithCredentials);
}