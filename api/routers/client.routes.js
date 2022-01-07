const Client = require('../controllers/client.controller');

module.exports = (app) => {
    app.route('/customer')
    .get( Client.getCustomers );
}