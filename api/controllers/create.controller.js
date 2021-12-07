const Sql = require('../db/sql');

exports.D0 = async(req, res) => {
    try{
        const issue = req.body.issue;
        const incident = req.body.incident;

        let query = "INSERT INTO issue() VALUES ?";
        const id = Sql.insertRecordSetQuery()

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