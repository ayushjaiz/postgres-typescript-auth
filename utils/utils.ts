import dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 *   Duration of the JWT token (3 days)
 */
const tokenDuration = 3 * 24 * 60 * 60;

/**
 * Generate a hashed password asynchronously using bcrypt.
 * 
 * @param password - Password to be hashed.
 * @returns - Promise that resolves to the hashed password.
 */
async function generateHashedPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

/**
 * Compare entered password with stored hashed password asynchronously using bcrypt.
 * 
 * @param enteredPassword - Password entered by the user.
 * @param storedPassword - hashed password stored in the database.
 * @returns Promise that resolves to true if passwords match, otherwise false.
 */
async function comparePassword(enteredPassword: string, storedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword);
}

/**
 * Generate a JWT token with user ID embedded.
 * 
 * @param id - User ID to embed in the token
 * @param options - Optional parameters.
 * @param options.duration - Duration of the token's validity in seconds.
 * @returns - Generated JWT token.
 */
function generateToken(id: number, duration: number = tokenDuration): string {
    const token = jwt.sign({ userId: id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: tokenDuration });
    return token;
}

/**
 * Verify the JWT token and extract the user ID.
 * 
 * @param token - The JWT token to verify.
 * @returns user ID extracted from the token.
 */
function verifyToken(token: string): number {
    const { userId } = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`) as { userId: number };
    return userId;
}


export { tokenDuration, generateToken, generateHashedPassword, comparePassword, verifyToken };