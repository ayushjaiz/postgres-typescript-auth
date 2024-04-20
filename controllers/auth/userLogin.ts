import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import { comparePassword, generateToken, tokenDuration } from '../../utils/utils';

async function userLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
        // Check if all fields are present
        if (!email || !password) {
            res.status(401).json({ message: 'Both email and password fields are required' });
            return;
        }

        // Retrieve user with provided email
        const user = await UserModel.getUser({ email: email });
        if (!user) {
            res.status(401).json({ message: 'User account not found' });
            return;
        }

        // Compare the hashed password
        if (!comparePassword(password, user.password)) {
            res.status(401).json({ message: 'Email or password is incorrect' });
            return;
        }

        // Generate token
        const token = generateToken(user.id!);

        // Add token to cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenDuration * 1000 });
        res.status(200).json({ message: 'Successful login', user: user, token: token });

    } catch (error) {
        console.error('Error logging user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default userLogin;