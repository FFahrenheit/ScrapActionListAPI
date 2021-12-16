const Sql = require('../db/sql');
const Identificator = require('../middlewares/auth.interceptor');

exports.getMyActions = async (req, res) => {
    try {
        const username = Identificator.getUser(req);

        const query = `SELECT * FROM ActionDetails WHERE responsible = '${username}'`;

        const actions = await Sql.request(query);

        return res.json({
            ok: true,
            actions
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
};