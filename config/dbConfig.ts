import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });
import { Pool } from "pg";

/**
 * Configuration object for database connection.
 */
const connectionConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(`${process.env.DB_PORT}`),
};

const pool = new Pool(connectionConfig);

/**
 * Connects database with server.
 */
async function connectToDB() {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (err) {
        throw err;
    }
}

/**
 * Creates 'users' table in the database if not already present.
 */
async function createUserTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
      `;
        await pool.query(query);
    } catch (err) {
        console.error(err);
        console.error('Users table creation failed');
    }
}

export { createUserTable, connectToDB };
export default pool;
