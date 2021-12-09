const Issue = require('../controllers/issue.controller');

module.exports = (app) => {
    app.route('/issue/:id')
    .get(Issue.getIssue)
}