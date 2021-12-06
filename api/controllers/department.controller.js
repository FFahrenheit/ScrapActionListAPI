const Sql = require('../db/sql');

exports.getDepartments = async (req, res) => {
    try {
        const query = "SELECT * FROM AllDepartments ORDER BY name ASC";

        const departments = await Sql.request(query);

        return res.json({
            ok: true,
            departments
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