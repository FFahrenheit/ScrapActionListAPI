const Sql = require('../db/sql');
const Interceptor = require('../middlewares/auth.interceptor');

exports.D0 = async(req, res) => {
    try{
        const issue = req.body.issue;
        issue['originator'] = Interceptor.getUser(req);
        const incident = req.body.incident;

        let query = "INSERT INTO issue() VALUES ?";
        const id = await Sql.insertRecordSetQuery(query, issue);

        if(incident != null){
            incident['issue'] = id;
            query = "INSERT INTO incident() VALUES ?";
            await Sql.query(query, incident);
        }

        return res.json({
            ok: true,
            id: id
        });
    }catch(e){
        console.log(e);
        return res.status(500).send({
            ok: false,
            error: e
        });
    }
};