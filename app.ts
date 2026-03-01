import express from 'express';
import notFound from '#middlewares/notFound.middleware.js';
import requestLogger from '#middlewares/request-logger.middleware.js';
import { numberSchema } from '#validations/common.validation.js';
import errorHandlerMiddleware from '#middlewares/error-handler.middleware.js';
import jwtMiddleware from '#middlewares/jwt.middleware.js';

import authRouter from '#routes/auth.route.js';
import blogRouter from '#routes/blog.route.js';
import userRouter from '#routes/user.route.js';
import bookingRouter from '#routes/booking.route.js';
import helmet from 'helmet';

import cors from 'cors';

const startingBaseURL = '/api/v1/';
const app = express();
app.use(
    cors(),
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        contentSecurityPolicy: false, // Only if whitelisting (Step 3) doesn't work
    }),
    express.json(),
    requestLogger
);
app.use(`${startingBaseURL}assets`, express.static('./public'));
// not found
app.use(`${startingBaseURL}auth`, authRouter); // jwt token
app.use(`${startingBaseURL}app`, jwtMiddleware, blogRouter); // secured jwt
app.use(`${startingBaseURL}app`, jwtMiddleware, userRouter); // secured jwt
app.use(`${startingBaseURL}app`, jwtMiddleware, bookingRouter); // secured jwt

app.use(notFound, errorHandlerMiddleware);

const PORT = process.env.PORT;
const portNumber = numberSchema.safeParse(PORT);
if (portNumber.error) {
    console.log('Server has not been started due to port issues');
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${portNumber.data}`);
});
