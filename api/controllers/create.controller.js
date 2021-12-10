const Sql = require('../db/sql');
const Interceptor = require('../middlewares/auth.interceptor');

exports.D3 = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        let { stocks, containment} = req.body;
        containment.issue = id;
        stocks = stocks.map(s => ({...s, issue: id})); //In case we don't receive the issue

        let query = "INSERT INTO stock() VALUES ?";
        await Sql.query(query, stocks);

        query = "INSERT INTO containment() VALUES ?";
        await Sql.query(query, containment);

        query = `UPDATE issue 
            SET d3 = CURRENT_TIMESTAMP,
            status = 'D3'
            WHERE id = '${ id }'`;
        await Sql.request(query);

        return res.json({
            ok: true
        });
    }catch(e){
        console.log(e);
        return res.status(500).send({
            ok: false,
            error: e
        });
    }
};

exports.D2 = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        let complication = req.body.complication;
        complication.issue = id;

        let query = "INSERT INTO complication() VALUES ?";

        await Sql.query(query, complication);

        query = `UPDATE issue 
            SET d2 = CURRENT_TIMESTAMP,
            status = 'D2'
            WHERE id = '${ id }'`;

        await Sql.request(query);

        return res.json({
            ok: true
        });
    }catch(e){
        console.log(e);
        return res.status(500).send({
            ok: false,
            error: e
        });
    }
};

exports.D1 = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        let participants = req.body.team;
        participants = participants.map(p => ({...p, issue: id})); //In case we don't receive the issue

        let query = "INSERT INTO team() VALUES ?";

        await Sql.query(query, participants);

        query = `UPDATE issue 
            SET d1 = CURRENT_TIMESTAMP,
            status = 'D1'
            WHERE id = '${ id }'`;

        await Sql.request(query);

        return res.json({
            ok: true
        });
    }catch(e){
        console.log(e);
        return res.status(500).send({
            ok: false,
            error: e
        });
    }
};

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