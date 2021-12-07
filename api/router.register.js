module.exports = (app) => {
    require('./routers/auth.routes')(app);
    require('./routers/issue.routes')(app);
    require('./routers/part.routes')(app);
    require('./routers/problem.routes')(app);
    require('./routers/user.routes')(app);
    require('./routers/department.routes')(app);
    require('./routers/create.routes')(app);
}