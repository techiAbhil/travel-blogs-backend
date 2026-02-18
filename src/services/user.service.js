import db from '#db';
import { updateUserSchema } from '#validations/user.validaton';
import { deleteFile, generateToken } from '#utils/hlper';

// profile pic upload

// update profile

export const updateProfile = async (req) => {
    const payload = updateUserSchema.parse(req.body);
    delete payload.password;
    const userDetails = await db.users.update({
        data: payload,
        where: {
            user_id: req.user.user_id,
        },
    });
    const token = generateToken(userDetails);
    return token;
};

export const updateUserPofilePic = async (req) => {
    const fileNameWithPath = `./public/profile/${req.user.profile_pic}`;

    deleteFile(fileNameWithPath);

    const userDetails = await db.users.update({
        data: {
            profile_pic: req.uniqueName,
        },
        where: {
            user_id: req.user.user_id,
        },
    });
    const token = generateToken(userDetails);
    return token;
};
