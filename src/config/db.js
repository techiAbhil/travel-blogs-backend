import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client.ts';

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
const log = [];
if (process.env.NODE_ENV === 'development') {
    log.push('query');
    log.push('error');
}

const prisma = new PrismaClient({ adapter, log });

export default prisma;
