const Sql = require('../db/sql');
const Identificator = require('../middlewares/auth.interceptor');

exports.closeAction = async(req, res) => {
    try {
        const id = req.params.id;
        const issue = req.params.issue;

        let query = `UPDATE action SET
            closed = CURRENT_TIMESTAMP,
            status = 'closed'  
            WHERE id = '${ id }'`;

        const actions = await Sql.request(query);

        query = `UPDATE issue 
            SET d6 = CURRENT_TIMESTAMP,
            status = 'D6'
            WHERE id = '${ issue }' AND 
            (SELECT COUNT(*) FROM action WHERE issue = '${ issue }') =
            (SELECT COUNT(*) FROM action WHERE issue = '${ issue }' AND status = 'closed')`;

        await Sql.request(query);
            
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