import { Router } from 'express'
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from '../controllers/user.controller.js';
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:resetToken', resetPassword);
router.get('/logout', isLoggedIn, logoutUser);


export default router;