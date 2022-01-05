const Sql = require('../db/sql');
const Interceptor = require('../middlewares/auth.interceptor');

exports.D8 = async(req, res) => {
    try{
        // const id = Sql.parseField(req.params.id);
        // const username = Sql.parseField(Interceptor.getUser(req));

        // query = `UPDATE issue 
        //     SET d8 = CURRENT_TIMESTAMP,
        //     status = 'D8',
        //     closedBy = '${ username }'
        //     WHERE id = '${ id }'`;

        // await Sql.request(query);

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
}

exports.D7 = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        let { actions, closure } = req.body;
        actions = actions.map(a => ({...a, issue: id})); //In case we don't receive the issue
        closure.issue = id;

        console.log({closure, actions});

        let query = "INSERT INTO action() VALUES ?";
        await Sql.query(query, actions);

        query = "INSERT INTO closure() VALUES ?";
        await Sql.query(query, closure);

        query = `UPDATE issue 
            SET d7 = CURRENT_TIMESTAMP,
            status = 'D7'
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

exports.D5 = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        let actions = req.body.actions;
        console.log(req.body.actions);
        actions = actions.map(a => ({...a, issue: id})); //In case we don't receive the issue

        let query = "INSERT INTO action() VALUES ?";
        await Sql.query(query, actions);

        query = `UPDATE issue 
            SET d5 = CURRENT_TIMESTAMP,
            status = 'D5'
            WHERE id = '${ id }' AND d5 IS NULL`;
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

exports.D4 = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        let why = req.body.why;
        console.log(req.body.why);
        why = why.map(w => ({...w, issue: id})); //In case we don't receive the issue

        let query = "INSERT INTO why() VALUES ?";
        await Sql.query(query, why);

        query = `UPDATE issue 
            SET d4 = CURRENT_TIMESTAMP,
            status = 'D4'
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