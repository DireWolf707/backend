import express from "express";
import {signup,login,logout,userProfile,userUpdate,passwordUpdate} from "../controllers/auth/controller.js";
import {loginRequired} from "../controllers/auth/middleware.js";
import {loginValidationChain,signupValidationChain,userUpdateValidationChain,passwordUpdateValidationChain} from "../controllers/auth/validation.js";

const router = express.Router();

router.route('/login').post(loginValidationChain, login);
router.route('/logout').post(logout);
router.route('/signup').post(signupValidationChain, signup);
router.route('/me')
    .get(loginRequired, userProfile)
    .post(loginRequired, userUpdateValidationChain, userUpdate);
router.route('/me/password')    
    .post(loginRequired, passwordUpdateValidationChain, passwordUpdate);

export default router;