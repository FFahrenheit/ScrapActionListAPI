const Sql = require('../db/sql');

exports.getProblems = async(req, res) => {
    try {
        const query = "SELECT * FROM problem ORDER BY description ASC";

        const problems = await Sql.request(query);

        return res.json({
            ok: true,
            problems
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