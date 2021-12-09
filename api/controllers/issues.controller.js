const Sql = require('../db/sql');
const Interceptor = require('../middlewares/auth.interceptor');

exports.getMyIssues = async(req, res) => {
    try{
        const user = Sql.parseField(Interceptor.getUser(req));
        let query;
        if(Sql.hasQuery(req)){
            return res.json({
                ok: true,
                error: 'Not yet implemented :('
            });
        }else{
            query = `SELECT TOP 100 * FROM AllIssues 
            WHERE username = '${ user }' ORDER BY created DESC`;
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

exports.getAllIssues = async(req, res) => {
    try{
        let query;
        if(Sql.hasQuery(req)){
            return res.json({
                ok: true,
                error: 'Not yet implemented :('
            });
        }else{
            query = `SELECT TOP 100 * FROM AllIssues ORDER BY created DESC`;
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