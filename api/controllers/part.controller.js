const Sql = require('../db/sql');

exports.getParts = async (req, res) => {
    try {
        const query = "SELECT * FROM AllParts ORDER BY number ASC";
        
        const parts = await Sql.request(query);
        
        return res.json({
            ok: true, 
            parts
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