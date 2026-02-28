import { bookingPayment, verifyPayment } from '#services/booking.service';
import type { Request, Response } from 'express';

export const bookingPaymentHandler = async (req: Request, res: Response) => {
    const booking = await bookingPayment(req);
    res.status(200).json({
        orderDetails: booking,
        success: true,
        msg: 'Success',
    });
};
export const verifyPaymentHandler = async (req: Request, res: Response) => {
    const bookingDetails = await verifyPayment(req);
    res.status(200).json({
        orderDetails: bookingDetails,
        success: true,
        msg: 'Success',
    });
};
