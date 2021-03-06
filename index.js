require('dotenv').config();
const fs = require('fs');

const express = require('express'),
    registerRoutes = require('./api/router.register'),
    app = express(),
    port = process.env.PORT || 2903;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', true);

app.use((req, res, next) => {
    let ip = req.ip;
    ip = ip.substr(ip.lastIndexOf(':') + 1);
    console.table([{ Timestamp: new Date().toLocaleString(), Method: req.method, Request: req.originalUrl, Client: ip }]);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

registerRoutes(app);

app.listen(port, () => {
    console.clear();
    console.log('\x1b[32m', `Server running in port ${port} on ${process.env.NODE_ENV} mode`);
    console.log('\x1b[34m%s\x1b[0m', '> ' + 0 + ' tasks running');

    if (process.env.NODE_ENV == 'production') {
        fs.appendFile('daemon/calibracionesapi.restarts.log',
            new Date() + ': Server restarted\n', (err) => {
                if (err) {
                    console.log("Couldn't update log");
                }
            });
    }
});