import { Router } from "express";
import { checkUserAuth } from "../middleware/authMiddleware";
import {
    userLogin,
    userLogout,
    userRegistration,
    changeUserPassord,
    sendPassWordResetEmail,
    resetPassword,
    getUserDetails
} from "../controllers";

const router = Router();

//Route Level Middleware
router.use('/change-password', checkUserAuth);
router.get('/user-info', checkUserAuth);

// Public routes
router.post('/signup', userRegistration);
router.post('/login', userLogin);
router.post('/send-passord-reset-email', sendPassWordResetEmail);
router.post('/reset-password/:id/:token', resetPassword);

// Protected routes
router.post('/change-password', changeUserPassord);
router.post('/logout', userLogout);
router.get('/user-info', getUserDetails);

export default router;
