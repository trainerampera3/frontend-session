const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


async function testDatabaseConnection() {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('PostgreSQL connected successfully');
        console.log('Database time:', result.rows[0].now);

    } catch (error) {
        console.error('PostgreSQL connection failed');
        console.error(error);
    }
}


testDatabaseConnection();


// app.post('/add-user', async (req, res) => {

//     const { username } = req.body;

//     try {

//         await pool.query(
//             'INSERT INTO users (name) VALUES ($1)',
//             [username]
//         );

//         res.send('Data successfully saved to PostgreSQL!');

//     } catch (err) {

//         console.error(err);

//         res.status(500).send('Database connection error.');
//     }
// });

// app.post(
//     '/' , async (req , res)=>{
//         try{
//             console.log("Yes It's connected");
            
//         }
//         catch(err){
//             console.log("Yes It's not connected");
//         }
//     }

// );

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports=pool;
