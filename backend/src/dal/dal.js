const db = require("mysql");

const pool = db.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "supermarketdb"
});

function executeQueryAsync(sqlCmd, values) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, values, (err, rows) => {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log(rows);
                resolve(rows);
            }
        });
    });

}

module.exports= {executeQueryAsync}