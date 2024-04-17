import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/utils';
import { getUser } from '../models/User';

async function checkUserAuth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: "Unauthorized User, no token" });
    }

    try {
        // Get token from header
        const token = authorization.split(' ')[1];

        // Verify Token
        const userId = verifyToken(token);

        // Get user from id
        const user = await getUser({ id: userId });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        // If everything is fine, proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error in checkUserAuth:', error);
        return res.status(401).json({ message: "Unauthorized User" });
    }
}

export { checkUserAuth };
