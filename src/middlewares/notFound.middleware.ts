import type { Request, Response } from 'express';

// default export
export default (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        msg: 'Requested resource is no longer avilable!',
    });
};
