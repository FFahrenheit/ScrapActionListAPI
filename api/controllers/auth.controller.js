const Sql = require('../db/sql'),
    jwt = require('jsonwebtoken'),
    { sso } = require('node-expose-sspi');

exports.loginWithSSO = async (req, res) => {
    try {
        if (!req.sso) { //No se completó
            return res.json({
                ok: false,
                error: 'Invalid credentials'
            });
        }

        //Se completó
        if (req.session) {
            req.session.sso = req.sso;
        }

        const resp = await getToken(req.sso);

        return res.json({
            ok: true,
            ...resp
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            ok: false,
            error: e
        });
    }
}


const getToken = async (sso) => {
    return new Promise(async (resolve, reject) => {
        try {

            const email = typeof sso.user.adUser.mail != 'undefined' ?
                sso.user.adUser.mail[0] : 'i.lopez@mx.interplex.com';

            const user = {
                name: sso.user.name,                //Username
                domain: sso.user.domain,            //Dominio
                displayName: sso.user.displayName,  //Nombre
                mail: email                         //Email
            };
            console.log(user);

            if (user.domain != 'INTERPLEX') {
                console.log('Not in domain!');
                reject('Not in domain');
            }

            let query = `SELECT * FROM users WHERE username = '${ user.name }'`
            let response = await Sql.request(query);

            if (!response || response.length == 0) { //Si no existe el usuario, lo creamos

                created = true;
                const body = {
                    username: user.name,
                    name: user.displayName,
                    email: user.mail,
                    position: 'user',
                };

                let query = 'INSERT INTO users() VALUES ?';

                await Sql.query(query, body);

                response = [body];
                console.log(response);
            }

            let bdUser = response[0];

            let awtInfo = {
                username: bdUser.username,
            };

            const token = jwt.sign(awtInfo, process.env.TOKEN_SEED);
            return resolve({
                token,
                user: {
                    username: bdUser.username,
                    position: bdUser.position,
                    name: bdUser.name,
                    email: bdUser.email,
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
}
