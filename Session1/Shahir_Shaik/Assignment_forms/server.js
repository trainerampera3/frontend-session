const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    port: 5433,
    database: "Users",
    user: "shahir",
    password: "shahir"
});

const name = "wewer";
const email = "rhfsf@gmail.com";
const pass = "shaieefr";

client.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");

        return client.query(
            `INSERT INTO userinfo (username, email, password)
             VALUES ($1, $2, $3)`,
            [name, email, pass]
        );
    })
    .then(() => {
        return client.query("SELECT * FROM userinfo");
    })
    .then((result) => {
        console.log(result.rows);
    })
    .catch((error) => {
        console.log("Connection failed:", error);
    });