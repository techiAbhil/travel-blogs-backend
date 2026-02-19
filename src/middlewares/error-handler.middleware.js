import * as z from 'zod';
import fs from 'fs';
import { Prisma } from '../../generated/prisma/client.ts';

const stringifyError = (err) => {
    if (typeof err === 'object') {
        return JSON.stringify(err);
    } else if (typeof err !== 'string') {
        return err?.toString() || 'Something went wrong';
    }
    return err;
};

export default (err, req, res, next) => {
    console.log(err);

    const path = './logs/error-log.txt';
    fs.appendFile(path, `\n\n ${stringifyError(err)}`, (error) => {
        if (error) {
            console.log('Error file related issue');
        }
    });

    if (err instanceof z.ZodError) {
        err.status = 400;
        err.msg = 'Bad Rquest';
        err.error = z.prettifyError(err);
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        err.status = 500;
        err.msg = 'Database Error!';
        err.error = err.message;
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        err.status = 500;
        err.msg = 'Database Error!';
        err.error = 'Unknow database error';
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        err.status = 500;
        err.msg = 'Database Error!';
        err.error = 'Database validation error';
    }

    res.status(err.status).json(err);
};
