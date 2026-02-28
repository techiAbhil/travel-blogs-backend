import {
    bookingPaymentHandler,
    verifyPaymentHandler,
} from '#controllers/booking.controller';
import express from 'express';

const router = express.Router();

router.post('/booking', bookingPaymentHandler);
router.post('/verify', verifyPaymentHandler);

export default router;
