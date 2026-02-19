import express from 'express';
import notFound from '#middlewares/notFound.middleware';
import requestLogger from '#middlewares/request-logger.middleware';
import { numberSchema } from '#validations/common.validation';
import errorHandlerMiddleware from '#middlewares/error-handler.middleware';
import jwtMiddleware from '#middlewares/jwt.middleware';

import authRouter from '#routes/auth.route';
import blogRouter from '#routes/blog.route';
import userRouter from '#routes/user.route';
import helmet from 'helmet';

import cors from 'cors';

const startingBaseURL = '/api/v1/';
const app = express();
app.use(helmet(), cors(), express.json(), requestLogger);
app.use(`${startingBaseURL}assets`, express.static('./public'));
// not found
app.use(`${startingBaseURL}auth`, authRouter); // jwt token
app.use(`${startingBaseURL}app`, jwtMiddleware, blogRouter); // secured jwt
app.use(`${startingBaseURL}app`, jwtMiddleware, userRouter); // secured jwt

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

/*

TODO: 
1- query string implementation in get all blogs
2- prisma related error handling
3- raw queries 
4- helmet, rate limiter, readme.md
*/
