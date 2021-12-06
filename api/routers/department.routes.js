const Department = require('../controllers/department.controller');

module.exports = (app) => {
    app.route('/department')
    .get( Department.getDepartments );
}