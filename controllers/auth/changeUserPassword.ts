import { Request, Response } from 'express';

async function changeUserPassord(req: Request, res: Response) {
    const { password, password_confirmation } = req.body;

    try {
        if (!password || !password_confirmation) {

            return;
        }

        if (password !== password_confirmation) {

            return;
        }
    } catch (error) {

    }

}

export default changeUserPassord;