const Issues = require('../controllers/issues.controller');

module.exports = (app) => {
    app.route('/problems')
        .get(Issues.getProblems);
}