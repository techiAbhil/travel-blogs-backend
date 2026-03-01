import type { Request, Response, NextFunction } from 'express';

// default export
export default (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ** ${req.url}`);
    }
    next();
};
