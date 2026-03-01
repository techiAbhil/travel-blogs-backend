import { usersModel } from './generated/prisma/models';

/**
 * Note: Configure this file in tsconfig.json - "include" to make the types available globally.
 */

declare module 'express-serve-static-core' {
    interface Request {
        user?: Partial<usersModel>;
        // for file handling
        uniqueName?: string;
        blog_id?: number;
    }
}
