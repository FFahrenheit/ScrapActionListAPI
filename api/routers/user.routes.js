const User = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/users')
        .get(User.getUsers);
}