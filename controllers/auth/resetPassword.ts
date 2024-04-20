import { Request, Response } from 'express';
import { generateHashedPassword, verifyToken } from '../../utils/utils';
import { UserModel } from '../../models/User';

async function resetPassword(req: Request, res: Response): Promise<void> {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;

    try {
        if (!password || !password_confirmation) {
            res.status(400).json({ status: "failed", message: 'Both Password and Confirm Password is required' });
            return;
        }

        // Check if password and confirm password is same
        if (password !== password_confirmation) {
            res.status(400).json({ status: "failed", message: 'Password and Confirm Password doesn\'t match' });
            return;
        }

        // Type Check
        if (typeof id !== 'string' || typeof token !== 'string') {
            res.status(400).json({ status: "failed", message: 'Invalid id or token not in string' });
            return;
        }

        // Hash the password
        const hashedPassword = await generateHashedPassword(password);

        // verify token
        const secretId = verifyToken(token);

        if (parseInt(id) !== secretId) {
            res.status(400).json({ status: "failed", message: 'Invalid id or token' });
            return;
        }

        await UserModel.updateUser(secretId, { password: password });

        res.status(201).json({ status: "success", message: 'Password changed successfully', });
    } catch (error) {
        res.status(500).json({ status: "failed", message: 'Internal server error' });
    }
}

export default resetPassword;