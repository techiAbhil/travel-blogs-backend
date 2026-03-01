import {
    bookingPaymentHandler,
    verifyPaymentHandler,
} from '#controllers/booking.controller.js';
import express from 'express';

const router = express.Router();

router.post('/booking', bookingPaymentHandler);
router.post('/verify', verifyPaymentHandler);

export default router;
