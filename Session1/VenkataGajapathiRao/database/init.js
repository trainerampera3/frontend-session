const fs = require('fs');
const path = require('path');

const pool = require('../server/config/db');

async function initializeDatabase() {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');

        const schema = fs.readFileSync(schemaPath, 'utf8');

        await pool.query(schema);

        console.log('Database schema created successfully');

    } catch (error) {
        console.error('Failed to create database schema');
        console.error(error);

    } finally {
        await pool.end();
    }
}

initializeDatabase();