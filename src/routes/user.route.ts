import {
    updateUserHandler,
    updateUserProfilePicHandler,
} from '#controllers/user.controller.js';
import multerInstance from '#middlewares/file-upload.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/user', updateUserHandler);
router.put(
    '/user/upload',
    multerInstance.single('profile_pic'),
    updateUserProfilePicHandler
);

export default router;
