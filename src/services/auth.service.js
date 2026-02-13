import { loginSchema, registerSchema } from '#validations/auth.validation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '#db';

export const login = async (req) => {
    const payload = loginSchema.parse(req.body);
    const userData = await db.users.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (userData && bcrypt.compareSync(payload.password, userData.password)) {
        delete userData.password;
        const token = jwt.sign(userData, process.env.JWT_SECRET);
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
