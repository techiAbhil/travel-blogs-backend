import db from '#db';
import { updateUserSchema } from '#validations/user.validaton.js';
import { deleteFile, generateToken } from '#utils/hlper.js';
import { type Request } from 'express';

// profile pic upload

// update profile

export const updateProfile = async (req: Request) => {
    const payload = updateUserSchema.parse(req.body);
    delete payload.password;
    const userDetails = await db.users.update({
        data: payload,
        where: {
            user_id: req.user?.user_id,
        },
    });
    const token = generateToken(userDetails);
    return token;
};

export const updateUserPofilePic = async (req: Request) => {
    const fileNameWithPath = `./public/profile/${req.user?.profile_pic}`;

    deleteFile(fileNameWithPath);

    const userDetails = await db.users.update({
        data: {
            profile_pic: req.uniqueName,
        },
        where: {
            user_id: req.user?.user_id,
        },
    });
    const token = generateToken(userDetails);
    return token;
};
