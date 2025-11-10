
const db = require("mysql2");
const fs = require('fs');


// const pool = db.createPool({
//     host: "localhost",
//     user: "root",
//     port: 3306,
//     database: "supermarketdb"
// });

const pool = db.createPool({
    host: "mysql-supermario-supermario.i.aivencloud.com",
    user: "avnadmin",
    port: 24875,
    database: "supermarketdb",
    password: "AVNS_6h9uBXjjSyg8EVTkvzF",
    ssl: {
    ca: fs.readFileSync('../backend/src/certs/ca.pem') 
  }
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
