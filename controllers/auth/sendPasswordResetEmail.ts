import { Request, Response } from "express";
import { generateToken, tokenDuration } from "../../utils/utils";
import { UserModel } from "../../models/User";
import { sendEmail } from "../../config/emailConfig"

async function sendPassWordResetEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
        res.send({ status: "failed", message: "Email field required" });
        return;
    }

    try {
        const user = await UserModel.getUser({ email: email });

        // Check if user is registered or not
        if (!user) {
            res.send({ status: "failed", message: "Email dosen't exist" })
            return;
        }

        // Generate token
        const token = generateToken(user.id!,600);

        // Frontend form link where the new password will be enetered
        const link = `http://localhost:3000/api/user/reset/${user.id}/${token}`

        // Send email to the user email
        const result = await sendEmail({
            email: email,
            subject: "Reset Password",
            body: `<a href=${link}>Click Here</a> to Reset Your Password`
        });

        res.status(201).send({ status: "success", message: "check email to change password", token: token });
    } catch (error) {
        res.status(500).send({ status: "failed", message: "InternaL Server Error" })
    }
}

export default sendPassWordResetEmail;