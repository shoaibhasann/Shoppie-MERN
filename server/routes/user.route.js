import { Router } from 'express'
import { changePassword, deleteUser, forgotPassword, getAllUsers, getProfile, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updateProfile, updateRole } from '../controllers/user.controller.js';
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:resetToken', resetPassword);

router.put('/password/update', isLoggedIn, changePassword);

router.put('/me/update', isLoggedIn, updateProfile);

router.put('/admin/user/:id', isLoggedIn, authorizedRoles('Admin'), updateRole);

router.get('/logout', isLoggedIn, logoutUser);

router.get('/me', isLoggedIn, getProfile);

router.get("/admin/users", isLoggedIn, authorizedRoles("Admin"), getAllUsers);

router.get("/admin/user/:id", isLoggedIn, authorizedRoles("Admin"), getUserDetails);

router.delete('/admin/user/:id', isLoggedIn, authorizedRoles('Admin'), deleteUser);


export default router;