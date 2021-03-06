const Issues = require('../controllers/issues.controller');
const Interceptor = require('../middlewares/auth.interceptor');

module.exports = (app) => {
    app.route('/issues/all')
    .get(Issues.getAllIssues);

    app.route('/issues/mine')
    .get([Interceptor.verifyUser], Issues.getMyIssues)
}