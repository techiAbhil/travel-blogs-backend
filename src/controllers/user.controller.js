import { updateProfile, updateUserPofilePic } from '#services/user.service';

export const updateUserHandler = async (req, res) => {
    const response = await updateProfile(req);
    res.status(200).json({
        msg: 'Blog has been successfully added',
        success: true,
        refreshToken: response, // blog: response // use this to accomodate frontend
    });
};

export const updateUserProfilePicHandler = async (req, res) => {
    const response = await updateUserPofilePic(req);
    res.status(200).json({
        msg: 'Blog has been successfully added',
        success: true,
        refreshToken: response, // blog: response // use this to accomodate frontend
    });
};
