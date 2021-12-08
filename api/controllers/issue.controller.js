const Sql = require('../db/sql');

exports.getAllIssues = async(req, res) => {
    try{
        let query;
        if(Sql.hasQuery(req)){
            return res.json({
                ok: true,
                error: 'Not yet implemented :('
            });
        }else{
            query = `SELECT TOP 100 * FROM AllIssues`
        }

        const issues = await Sql.request(query);

        return res.json({
            ok:true,
            issues
        });
    }catch(e){
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
}