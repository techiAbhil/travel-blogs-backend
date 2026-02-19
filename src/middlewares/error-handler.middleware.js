import * as z from 'zod';
import fs from 'fs';
import { Prisma } from '../../generated/prisma/client';

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
        return res.status(400).json({
            success: false,
            msg: 'Invalid request object',
            error: z.prettifyError(err),
        });
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        res.status(500).json({
            success: false,
            msg: 'Database issue',
            error: err,
        });
    }

    res.status(500).json({ success: false, msg: 'Something went wrong!' });
};
