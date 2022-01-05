const Sql = require('../db/sql');

exports.updateManagers = async(req, res) => {
    try {
        let body = req.body.departments;

        let calls = [];
        body.forEach(d => {
            calls.push(
                Sql.request(
                    `UPDATE department SET manager = '${ d.manager }' WHERE name = '${ d.name }'`
                )
            );
        });

        await Promise.all(calls);
        
        return res.json({
            ok: true,
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