import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/utils';
import { UserModel } from '../models/User';

// Custom interface extending the Request interface
export interface AuthenticatedRequest extends Request {
    user?: any; 
}

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
        const user = await UserModel.getUser({ id: userId });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        
        (req as AuthenticatedRequest).user = user;

        // If everything is fine, proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error in checkUserAuth:', error);
        return res.status(401).json({ message: "Unauthorized User" });
    }
}

export { checkUserAuth };
