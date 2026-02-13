import { loginHandler, registerHandler } from '#controllers/auth.controller';
import express from 'express';

const router = express.Router();

router.post('/login', loginHandler);
router.post('/register', registerHandler);

export default router;
