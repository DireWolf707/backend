import express from "express";
import {signup,login,logout,userProfile,userUpdate,passwordUpdate} from "../controllers/auth/controller.js";
import {loginRequired} from "../controllers/auth/middleware.js";

const router = express.Router();

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/signup').post(signup);

router.route('/me')
    .get(loginRequired, userProfile)
    .post(loginRequired, userUpdate)
router.route('/me/password')    
    .post(loginRequired, passwordUpdate);

export default router;