const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.HOST,
    database: process.env.DATABASE,
    options: {
        instanceName: 'SQLEXPRESS',
        trustServerCertificate: true
    }
}

function update(query,data){
    let req = getUpdates(query,data);
    return request(req);
}

function getUpdates(query, data){
    let updates = [];
    Object.keys(data).forEach(k => {
        if(data[k]!=null && typeof data[k] != 'object'){
            let val = data[k].toString().replace(/'/g,"''");
            val = "'" + val + "'";
            let update = k + ' = ' + val;
            updates.push(update);
        }
    });

    query = query.replace("()", updates.toString());
    query = query.replace("?", " id = '" + data.id + "'");

    return query;
}

const insertRecordSetQuery = async(query, body)=>{
    let req = getQuery(query, body);
    console.log(req);
    req = req +  ';SELECT SCOPE_IDENTITY() as ID';
    const response = await request(req);
    return response[0].ID;
}

const insertRecordset = async(query)=>{
    query = query + ';SELECT SCOPE_IDENTITY() as ID';
    const response = await request(query);
    return response[0].ID;
}

const hasQuery = (req) => {
    return Object.keys(req.query).length !== 0;
}

const parseField = (str) => {
    return str?.toString().replace(/'/g, "''") || "";
}

const query = async (query, data) => {
    let req = getQuery(query, data);
    return request(req);
}

const getQuery = (query, data) => {
    let columns = [];
    let rows = [];
    if (!Array.isArray(data)) {
        for (var key of Object.keys(data)) {
            columns.push(key);
            let val = data[key].toString().replace(/'/g, "''");
            rows.push("'" + val + "'");

        }
        query = query.replace("()", "(" + columns.toString() + ")");
        query = query.replace("?", "(" + rows.toString() + ")");
        return query;
    } else {
        for (let [index, val] of data.entries()) {
            let row = [];
            for (let key of Object.keys(val)) {
                if (index === 0) {
                    columns.push(key);
                }
                let data = val[key].toString().replace(/'/g, "''");
                row.push("'" + data + "'");
            }
            rows.push(row);
        }
        let entries = [];
        for (let row of rows) {
            let entrie = "(" + row.toString() + ")";
            entries.push(entrie);
        }
        query = query.replace("()", "(" + columns.toString() + ")");
        query = query.replace("?", entries.toString());
        return query;
    }
}

const request = async (query) => {
    console.info(query);
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query(query);
        }).then(result => {
            sql.close();
            resolve(result.recordset);
        }).catch(err => {
            console.error(err);
            sql.close();
            reject(err);
        });
    });
}

module.exports = {
    query,
    request,
    parseField,
    hasQuery,
    insertRecordset,
    insertRecordSetQuery,
    update
};