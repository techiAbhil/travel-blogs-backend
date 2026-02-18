import { updateProfile, updateUserPofilePic } from '#services/user.service';

export const updateUserHandler = async (req, res) => {
    const response = await updateProfile(req);
    res.status(200).json({
        msg: 'User details has been updated',
        success: true,
        refreshToken: response,
    });
};

export const updateUserProfilePicHandler = async (req, res) => {
    const response = await updateUserPofilePic(req);
    res.status(200).json({
        msg: 'Profile pic has been successfully uploaded',
        success: true,
        refreshToken: response,
    });
};
