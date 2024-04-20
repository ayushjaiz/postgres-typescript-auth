import { Request, Response } from 'express';
import { generateHashedPassword } from '../../utils/utils';
import { UserModel } from '../../models/User';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

async function changeUserPassord(req: AuthenticatedRequest, res: Response) {
    const { password, password_confirmation } = req.body;

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

        // Access the user property from the AuthenticatedRequest
        const user = req.user;
        console.log(user);

        // Hash the password
        const hashedPassword = await generateHashedPassword(password);

        // Update user password in database
        await UserModel.updateUser(user.id, { password: hashedPassword });

        res.status(201).json({ status: "success", message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ status: "failed", message: 'Internal server error' });
    }

}

export default changeUserPassord;