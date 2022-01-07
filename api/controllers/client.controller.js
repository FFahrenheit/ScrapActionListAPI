const Sql = require('../db/sql');

exports.getCustomers = async (req, res) => {
    try {
        const query = "SELECT * FROM client ORDER BY name ASC";
        
        const customers = await Sql.request(query);
        
        return res.json({
            ok: true, 
            customers
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
}