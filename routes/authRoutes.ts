import { Router } from "express";
import { checkUserAuth } from "../middleware/authMiddleware";
import { userLogin, userLogout, userRegistration, changeUserPassord, resetPassword } from "../controllers"
const router = Router();

//Route Level Middleware
router.use('/change-password', checkUserAuth);
router.use('/loggeduser', checkUserAuth);

// Public routes
router.post('/register', userRegistration);
router.post('/login', userLogin);

// Protected routes
router.post('/change-password', changeUserPassord);
router.get('/logout', userLogout);

export default router;
