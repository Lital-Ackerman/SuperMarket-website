const db = require("mysql");

const pool = db.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "supermarketdb"
});


/**
 * Send request to DB and return response.
 */
function executeQueryAsync(sqlCmd, values) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, values, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });

}

module.exports= {executeQueryAsync}