import * as z from 'zod';
import fs from 'fs';

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
            issues: z.prettifyError(err),
        });
    }

    res.status(500).json({ success: false, msg: 'Something went wrong!' });
};
