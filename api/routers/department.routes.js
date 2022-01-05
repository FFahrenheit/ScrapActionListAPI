const Department = require('../controllers/department.controller');

module.exports = (app) => {
    app.route('/department')
    .get( Department.getDepartments );

    app.route('/department')
    .put( Department.updateManagers );
}