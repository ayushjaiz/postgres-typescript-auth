import pool from "../config/dbConfig";

interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}

/**
 * Manages user-related operations in the database.
 * 
 * Methods:
 * - createUser: Adds new user information to the database.
 * - getUser: Retrieves user information from the database.
 * - updateUser: Updates user information in the database.
 */
class UserModel {
    /**
     * Adds a new user information in the database.
     * 
     * @param User - User object to add.
     * @returns Promise that resolves to the added user.
     */
    static async createUser(user: User): Promise<User> {
        try {
            const { username, email, password: hashedPassword } = user;
            const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
            const values = [username, email, hashedPassword];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error: any) {
            throw new Error('Failed to create user: ' + error.message);
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
    static async getUser(options: { email?: string, id?: number }): Promise<User | null> {
        try {
            const { email, id } = options;
            const query = 'SELECT * FROM users WHERE email = $1 OR id = $2';
            const values = [email, id];

            const result = await pool.query(query, values);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error: any) {
            throw new Error('Failed to retrieve user: ' + error.message);
        }
    }

    /**
     * Updates user information in the database.
     * 
     * @param id - ID of the user to update.
     * @param options - An object containing optional fields to update.
     * @param options.email - New email address of the user.
     * @param options.password - New password of the user.
     * @returns Promise that resolves to the updated user or null if no user was found.
     */
    static async updateUser(id: number, options: { email?: string, password?: string }): Promise<boolean> {
        try {
            const { email, password } = options;
            const query = 'UPDATE users SET email = $1, password = $2 WHERE id = $3';
            const values = [email, password, id];

            const result = await pool.query(query, values);
            return result.rowCount != null && result.rowCount > 0; // Return true if any rows were affected
        } catch (error: any) {
            throw new Error('Failed to update user: ' + error.message);
        }
    }
}

export default User;
export { UserModel };
