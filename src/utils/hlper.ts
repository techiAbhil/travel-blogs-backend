import jwt from 'jsonwebtoken';
import fs from 'fs';
import { usersModel } from 'generated/prisma/models';

export const generateToken = (userDetails: usersModel) => {
    const { password, ...userDetailsWithoutPassword } = userDetails;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }
    const token = jwt.sign(userDetailsWithoutPassword, secret);
    return token;
};

export const deleteFile = (fileNameWithPath: string) => {
    if (fileNameWithPath && fs.existsSync(fileNameWithPath)) {
        fs.unlink(fileNameWithPath, (error) => {
            if (error) {
                console.log('failed to delete file = ', error);
            }
        });
    }
};
