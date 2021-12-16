const Action = require('../controllers/action.controller');
const Interceptor = require('../middlewares/auth.interceptor');

module.exports = (app) => {
    app.route('/actions/self')
    .get( [Interceptor.verifyUser ], Action.getMyActions);

    app.route('/action/:issue/:id')
    .put( [Interceptor.verifyUser ], Action.closeAction);
}