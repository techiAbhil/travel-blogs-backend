import { updateProfile, updateUserPofilePic } from '#services/user.service';
import type { Request, Response } from 'express';

export const updateUserHandler = async (req: Request, res: Response) => {
    const response = await updateProfile(req);
    res.status(200).json({
        msg: 'User details has been updated',
        success: true,
        refreshToken: response,
    });
};

export const updateUserProfilePicHandler = async (
    req: Request,
    res: Response
) => {
    const response = await updateUserPofilePic(req);
    res.status(200).json({
        msg: 'Profile pic has been successfully uploaded',
        success: true,
        refreshToken: response,
    });
};
