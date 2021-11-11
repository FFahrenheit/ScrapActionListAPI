const Auth = require('../controllers/auth.controller'),
    DomainAuth = require('../middlewares/domain.auth'),
    Interceptor = require('../middlewares/auth.interceptor');

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
        ], Auth.loginWithCredentials)
        .put([
            Interceptor.verifyUser
        ], Auth.refreshToken);
}