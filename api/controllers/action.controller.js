const Sql = require('../db/sql');
const Identificator = require('../middlewares/auth.interceptor');

const ISSUE_CLOSERS = ['Martha.Rodriguez', 'r.gomez'];

exports.closeAction = async(req, res) => {
    try {
        const id = req.params.id;
        const issue = req.params.issue;

        let query = `UPDATE action SET
            closed = CURRENT_TIMESTAMP,
            status = 'closed'  
            WHERE id = '${ id }'`;
        
        await Sql.request(query);

        query = `SELECT type FROM action WHERE id = '${ id }'`;

        let type = await Sql.request(query);
        type = type[0]['type'];

        console.log({type});

        if(type == 'corrective'){

            query = `UPDATE issue 
                SET d6 = CURRENT_TIMESTAMP,
                status = 'D6'
                WHERE id = '${ issue }' AND 
                (SELECT COUNT(*) FROM action WHERE issue = '${ issue }' AND type = 'corrective') =
                (SELECT COUNT(*) FROM action WHERE issue = '${ issue }' AND status = 'closed' AND type = 'corrective')`;

                await Sql.request(query);
        }else{

            query = `SELECT 
            (SELECT COUNT(*) FROM action WHERE issue = '${ issue }' AND type = 'preventive') as total,
            (SELECT COUNT(*) FROM action WHERE issue = '${ issue }' AND type = 'preventive' AND status = 'closed') as done,
            (SELECT d8 FROM issue WHERE id = '${ issue }') as d8`;

            let resp = await Sql.request(query);
            resp = resp[0];


            if(resp['total'] == resp['done'] && !resp['d8']){ //Subir las autorizaciones
                query = `UPDATE issue SET d8 = CURRENT_TIMESTAMP WHERE id = '${ issue }'`;
                await Sql.request(query);

                let body = [];

                ISSUE_CLOSERS.forEach(manager =>{
                    body.push({
                        issue: issue,
                        manager: manager
                    });
                });

                query = `INSERT INTO authorizations() VALUES ?`;

                await Sql.query(query, body);
            }
        }

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
};

exports.getMyActions = async (req, res) => {
    try {
        const username = Identificator.getUser(req);

        const query = `SELECT * FROM ActionDetails 
        WHERE (responsible = '${ username }' OR originator = '${ username }')
        AND status <> 'closed'`;

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