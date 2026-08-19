const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const pool = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));


app.post('/add-user', async (req, res) => {

    const { username } = req.body;

    try {

        await pool.query(
            'INSERT INTO users (name) VALUES ($1)',
            [username]
        );

        res.send('Data successfully saved to PostgreSQL!');

    } catch (err) {

        console.error(err);

        res.status(500).send('Database error.');
    }
});

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
                (name, email, password_hash)
            VALUES
                ($1, $2, $3)
            RETURNING id, name, email, role, created_at`,
            [name, email, passwordHash]
        );

        res.status(201).json({
            message: 'Registration successful',
            user: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Registration failed'
        });
    }
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});