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

router.post('/', (req, res) => {
    const { message } = req.body;
    res.send('Response from server ' + message);
})

//Route Level Middleware
router.use('/change-password', checkUserAuth);
router.get('/user-details', checkUserAuth);

// Public routes
router.post('/register', userRegistration);
router.post('/login', userLogin);
router.post('/send-passord-reset-email', sendPassWordResetEmail);
router.post('/reset-password', resetPassword);

// Protected routes
router.post('/change-password', changeUserPassord);
router.post('/logout', userLogout);
router.get('/user-details', getUserDetails);

export default router;
