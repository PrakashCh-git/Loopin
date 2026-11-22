import {Router} from 'express'
import authController from '../controllers/auth.controller.js';
import authUser from "../middlewares/authUser.js"
import upload from '../middlewares/multer.js';

const router = Router();

router.post('/register',authController.registerController);
router.post('/login',authController.loginController);
router.get('/get-me',authUser,authController.getMe);
router.post('/logout',authController.logoutController);
router.post('/update',authUser,upload.fields([{name:'profile',maxCount:1},{name:'cover',maxCount:1}]),authController.updateUser);
router.post('/discover',authUser,authController.discoverUser);
router.post('/follow',authUser,authController.discoverUser);
router.post('/unfollow',authUser,authController.unfollowUser);



export default router