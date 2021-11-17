
module.exports = (app) => {
    require('./routers/auth.routes')(app);
    require('./routers/issues.routes')(app);
    require('./routers/part.routes')(app);
}