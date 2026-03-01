import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { type usersModel } from 'generated/prisma/models';

export default (req: Request, res: Response, next: NextFunction) => {
    const authoriztion = req.headers.authorization;
    if (authoriztion) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        const token = authoriztion.split('Bearer ')[1];
        const decodedJWT = jwt.verify(token, secret) as Partial<usersModel>;

        if (decodedJWT) {
            req.user = decodedJWT;
            return next();
        }
    }
    res.status(401).json({
        success: false,
        msg: 'Unauthorized access',
    });
};
