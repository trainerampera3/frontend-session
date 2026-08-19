const { Pool } = require("pg");
 
const db = new Pool({
    user: "pushpa",
    host: "localhost",
    database: "services",
    password: "admin@123",
    port: 5432
});
 
db.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.log("Connection Error:", err));