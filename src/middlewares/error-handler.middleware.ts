import * as z from 'zod';
import fs from 'fs';
import type { Request, Response, NextFunction } from 'express';
import { Prisma } from 'generated/prisma/client';

const stringifyError = (err: Error) => {
    if (typeof err === 'object') {
        return JSON.stringify(err);
    } else if (typeof err !== 'string') {
        return 'Something went wrong';
    }
    return err;
};

export default (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);

    const path = './logs/error-log.txt';
    fs.appendFile(path, `\n\n ${stringifyError(err)}`, (error) => {
        if (error) {
            console.log('Error file related issue');
        }
    });
    const errorResponse = {
        status: 500,
        msg: 'Something went wrong!',
        error: '',
    };
    if (err instanceof z.ZodError) {
        errorResponse.status = 400;
        errorResponse.msg = 'Bad Rquest';
        errorResponse.error = z.prettifyError(err);
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        errorResponse.status = 500;
        errorResponse.msg = 'Database Error!';
        errorResponse.error = err.message;
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        errorResponse.status = 500;
        errorResponse.msg = 'Database Error!';
        errorResponse.error = 'Unknow database error';
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        errorResponse.status = 500;
        errorResponse.msg = 'Database Error!';
        errorResponse.error = 'Database validation error';
    }

    res.status(errorResponse.status).json(errorResponse);
};
