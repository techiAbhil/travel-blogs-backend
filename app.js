import express from 'express';
import notFound from '#middlewares/notFound.middleware';
import requestLogger from '#middlewares/request-logger.middleware';
import { numberSchema } from '#validations/common.validation';
import errorHandlerMiddleware from '#middlewares/error-handler.middleware';

import authRouter from '#routes/auth.route';
import blogRouter from '#routes/blog.route';

const app = express();
app.use(express.json(), requestLogger);
// not found
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/app', blogRouter);

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
