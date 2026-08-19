const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    user: "deepika",
    host: "localhost",
    database: "employees",
    password: "deepu1014",
    port: 5433
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool.connect()
    .then(() => {
        console.log("PostgreSQL connected successfully!");
    })
    .catch((error) => {
        console.log("Database connection failed!");
        console.log(error);
    });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});



