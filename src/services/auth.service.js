import { loginSchema, registerSchema } from '#validations/auth.validation';
import bcrypt from 'bcryptjs';
import db from '#db';
import { generateToken } from '#utils/hlper';

export const login = async (req) => {
    const payload = loginSchema.parse(req.body);
    const userData = await db.users.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (userData && bcrypt.compareSync(payload.password, userData.password)) {
        const token = generateToken(userData);
        return token;
    }
};
export const register = async (req) => {
    const payload = registerSchema.parse(req.body);

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(payload.password, salt);

    const response = await db.users.create({
        data: {
            ...payload,
            password: encryptedPassword,
        },
    });
    delete response.password;
    return response;
};
