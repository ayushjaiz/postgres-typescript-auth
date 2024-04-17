import { Request, Response } from 'express';

async function userLogout(req: Request, res: Response) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
}

export default userLogout;