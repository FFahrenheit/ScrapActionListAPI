const Sql = require('../db/sql');
const Interceptor = require('../middlewares/auth.interceptor');

exports.getIssue = async (req, res) => {
    try {
        const id = Sql.parseField(req.params.id);

        let query = `SELECT * FROM AllIssues WHERE id = '${id}'`;

        let resp = await Sql.request(query);

        if (!resp || res.length == 0) {
            return res.json({
                ok: false
            });
        }

        resp = resp[0];
        let incident = null;

        if (resp['type'] == 'Customer incident') {
            query = `SELECT * FROM incident WHERE issue = '${id}'`;
            incident = await Sql.request(query);

            incident = incident && incident.length > 0 ? incident[0] : null;
        }

        resp.incident = incident;

        query = `SELECT d1, d2, d3, d4, d5, d6, d7, d8 FROM issue WHERE id = '${id}'`;

        let done = await Sql.request(query);
        let result;
        done = done[0];

        for (const key of Object.keys(done)) {
            const value = done[key];
            console.log({ key, value });
            if (value == null) {
                resp[key] = null;
                continue;
            }

            switch (key) {
                case 'd1':
                    query = `SELECT team.member, team.position, team.id, users.name, users.email 
                        FROM team, users 
                        WHERE team.issue = '${id}'
                        AND team.member = users.username`;
                    result = await Sql.request(query);
                    resp[key] = { team: result };
                    break;
                case 'd2':
                    query = `SELECT * FROM complication WHERE issue = ${ id }`; //Not worth not selecting id nor issue...
                    result = await Sql.request(query);
                    resp[key] = result[0] || {};
                    break;
                default:
                    resp[key] = { message: "Not yet implemented" };
            }
            resp[key].done = value;
        }

        return res.json({
            ok: true,
            issue: resp
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
}