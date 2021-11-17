const Problem = require('../controllers/problem.controller');

module.exports = (app) => {
    app.route('/problem')
        .get(Problem.getProblems);
}