import db from '#db';
import { updateUserSchema } from '#validations/user.validaton';
import { generateToken } from '#utils/hlper';

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
    const userDetails = await db.users.update({
        data: {
            profile_pic: '',
        },
        where: {
            user_id: req.user.user_id,
        },
    });
    const token = generateToken(userDetails);
    return token;
};
