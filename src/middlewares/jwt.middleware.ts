import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const authoriztion = req.headers.authorization;
    if (authoriztion) {
        const token = authoriztion.split('Bearer ')[1];
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

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
