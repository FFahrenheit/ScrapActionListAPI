const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader != null && typeof bearerHeader != 'undefined') {
        const headers = bearerHeader.split(" ");
        const bearerToken = headers[1];
        if (bearerToken != null && typeof bearerToken != 'undefined') {
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
}

const getUser = (req) =>{
    const user = jwt.verify(req.token, process.env.TOKEN_SEED)['username'];
    console.log({ user });
    return user;
}

module.exports = {
    verifyUser,
    getUser
};