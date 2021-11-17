const Part = require('../controllers/part.controller');

module.exports = (app) => {
    app.route('/part')
    .get( Part.getParts);
}