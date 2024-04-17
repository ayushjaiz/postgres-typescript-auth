import pool from "../config/dbConfig";

interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}

/**
 * Adds a new user information in the database.
 * 
 * @param User - User object to add.
 * @returns Promise that resolves to the added user.
 */
async function createUser(user: User): Promise<User> {
    try {
        const { username, email, password: hashedPassword } = user;
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [username, email, hashedPassword];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to create user');
    }
}

/**
 * Retrieve user information from the database.
 * 
 * @param options - An object containing options fields to filter user retrieval.
 * @param options.email - Email address of the user to retrieve.
 * @param options.id - Id of the user to retrieve.
 * @returns Promise that resolves to the retrieved user or null if no user was found.
 */
async function getUser(options: { email?: string, id?: number }): Promise<User | null> {
    try {
        let query = 'SELECT * FROM users WHERE';
        const values = [];

        if (options.email) {
            query += ' email = $' + (values.length + 1);
            values.push(options.email);
        }
        if (options.id) {
            query += ' password = $' + (values.length + 1);
            values.push(options.id);
        }

        const result = await pool.query(query, values);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

/**
 * Updates user information in the database.
 * 
 * @param id - ID of the user to update.
 * @param options - An object containing optional fields to update.
 * @param options.email - New email address of the user.
 * @param options.password - New password of the user.
 * @returns Promise that resolves to the updated user or null if no user was found.
 */
async function updateUser(id: number, options: { email?: string, password?: string }): Promise<User | null> {
    try {
        let query = 'UPDATE users SET';
        const values = [];

        if (options.email) {
            query += ' email = $' + (values.length + 1);
            values.push(options.email);
        }
        if (options.password) {
            query += ' password = $' + (values.length + 1);
            values.push(options.password);
        }

        query += ' WHERE id = $' + (values.length + 1);
        values.push(id);

        const result = await pool.query(query, values);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};


export default User;
export { createUser, getUser, updateUser };
