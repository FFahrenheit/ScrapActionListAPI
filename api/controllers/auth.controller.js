const Sql = require('../db/sql'),
    Identificador = require('../middlewares/auth.interceptor'),
    jwt = require('jsonwebtoken'),
    { sso } = require('node-expose-sspi');

exports.refreshToken = async (req, res) => {
    const username = Identificador.getUser(req);

    try {
        const resp = await getUser({name: username});

        return res.json({
            ok: true, 
            ... resp
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            ok: false,
            error: e
        });
    }
}

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

exports.loginWithCredentials = async (req, res) => {
    try {
        const domain = sso.getDefaultDomain();

        const credentials = { // : UserCredential 
            domain,
            user: req.body.login,
            password: req.body.password,
        };

        console.log(credentials);

        const ssoObject = await sso.connect(credentials);

        if (!ssoObject) {
            return res.json({
                ok: false,
                error: 'Invalid credentials'
            });
        }

        if (req.session) {
            req.session.sso = ssoObject;
        }

        const resp = await getToken(ssoObject);
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
};

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

            const resp = await getUser(user);

            return resolve({
                ...resp
            });
        } catch (e) {
            return reject(e);
        }
    });
}

let getUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM users WHERE username = '${ user.name }'`
            let response = await Sql.request(query);

            if (!response || response.length == 0) { //Si no existe el usuario, lo creamos

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

            const bdUser = response[0];

            const awtInfo = {
                username: bdUser.username,
            };
            const token = jwt.sign(awtInfo, process.env.TOKEN_SEED);

            resolve({
                token,
                user: {
                    username: bdUser.username,
                    position: bdUser.position,
                    name: bdUser.name,
                    email: bdUser.email,
                }
            });

        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
