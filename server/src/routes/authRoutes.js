import {Router} from 'express'
import authController from '../controllers/auth.controller.js';
import authUser from "../middlewares/authUser.js"


const router = Router();


router.post('/register',authController.registerController);
router.post('/login',authController.loginController);
router.get('/get-me',authUser,authController.getMe);
router.post('/logout',authController.logoutController)



export default router