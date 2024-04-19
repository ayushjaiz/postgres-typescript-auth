import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

async function getUserDetails(req: AuthenticatedRequest, res: Response) {
    try {
        // Access the user property from the AuthenticatedRequest
        const user = req.user;

        res.status(201).json({ status: "success", user: user });
    } catch (error) {
        res.status(500).json({ status: "failed", message: 'Internal server error' });
    }

}

export default getUserDetails;