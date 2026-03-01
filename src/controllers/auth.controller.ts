import { login, register } from '#services/auth.service.js';
import type { Request, Response } from 'express';

export const loginHandler = async (req: Request, res: Response) => {
    const token = await login(req);
    if (token) {
        return res
            .status(200)
            .json({ msg: 'login success', success: true, token });
    }
    res.status(401).json({ msg: 'Unaouthorized', success: false });
};

export const registerHandler = async (req: Request, res: Response) => {
    const response = await register(req);
    res.status(200).json({ msg: 'register success', success: true, response });
};
