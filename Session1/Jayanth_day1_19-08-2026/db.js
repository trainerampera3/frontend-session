const {Client} = require('pg')

const client = new Client({
    host:'localhost',
    port:5433,
    user:'jayanth',
    password:'admin@123',
    database:'web_app'
})

client.connect()
.then(() => {
    console.log('PostgreSql connected Successfully');
})
.catch((err) => {
    console.log('PostgreSQL connection Failed', err.message)
});

module.exports = client