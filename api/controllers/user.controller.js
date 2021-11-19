const Sql = require('../db/sql');

exports.getUsers = async(req, res) => {
    try {
        const query = `SELECT name, username, email, position 
        FROM users ORDER BY name ASC`;
        
        const users = await Sql.request(query);
        
        return res.json({
            ok: true, 
            users
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