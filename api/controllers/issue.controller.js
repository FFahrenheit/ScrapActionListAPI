const Sql = require('../db/sql');
const Interceptor = require('../middlewares/auth.interceptor');

exports.getIssue = async(req, res) => {
    try{
        const id = Sql.parseField(req.params.id);
        
        let query = `SELECT * FROM AllIssues WHERE id = '${ id }'`;

        let resp = await Sql.request(query);

        if(!resp || res.length == 0){
            return res.json({
                ok: false
            });
        }

        resp = resp[0];

        query = `SELECT d1, d2, d3, d4, d5, d6, d7, d8 FROM issue WHERE id = '${ id }'`;

        let done = await Sql.request(query);
        done = done[0];

        //Aqui se irá cargando lo correspondiente a cada "D"
        Object.keys(done).forEach(d => {
            const value = done[d];
            console.log({ d, value });
        });

        return res.json({
            ok:true,
            issue: resp
        });
    }catch(e){
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
}